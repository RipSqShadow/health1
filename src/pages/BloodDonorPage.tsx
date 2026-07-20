import { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { Droplet, Search, Phone, MapPin, UserPlus, ShieldCheck, X } from 'lucide-react';

// Define types
interface Donor {
    name: string;
    bloodGroup: string;
    village: string;
    phone: string;
    lastDonated: string;
}

interface FormData {
    name: string;
    bloodGroup: string;
    village: string;
    phone: string;
    lastDonated: string;
}

export default function BloodDonorPage() {
    const [bloodGroup, setBloodGroup] = useState<string>('O+');
    const [showRegisterForm, setShowRegisterForm] = useState<boolean>(false);
    const [donors, setDonors] = useState<Donor[]>([
        { name: 'Ramesh Singh', bloodGroup: 'O+', village: 'Rampur', phone: '+91 9876543210', lastDonated: '3 months ago' },
        { name: 'Sita Devi', bloodGroup: 'O+', village: 'Sitapur', phone: '+91 9876543211', lastDonated: '5 months ago' },
        { name: 'Vikram Patel', bloodGroup: 'O-', village: 'Gorakhpur', phone: '+91 9876543212', lastDonated: '8 months ago' },
        { name: 'Anita Kumar', bloodGroup: 'AB+', village: 'Rampur', phone: '+91 9876543213', lastDonated: '1 year ago' },
    ]);

    const [formData, setFormData] = useState<FormData>({
        name: '',
        bloodGroup: 'O+',
        village: '',
        phone: '',
        lastDonated: 'Just now'
    });

    const filteredDonors = donors.filter(d => bloodGroup === 'All' || d.bloodGroup === bloodGroup);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRegister = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate form
        if (!formData.name || !formData.bloodGroup || !formData.village || !formData.phone) {
            alert('Please fill in all required fields');
            return;
        }

        // Add new donor to the list
        const newDonor: Donor = {
            name: formData.name,
            bloodGroup: formData.bloodGroup,
            village: formData.village,
            phone: formData.phone,
            lastDonated: 'Just now'
        };

        setDonors(prev => [newDonor, ...prev]);

        // Reset form and close modal
        setFormData({
            name: '',
            bloodGroup: 'O+',
            village: '',
            phone: '',
            lastDonated: 'Just now'
        });
        setShowRegisterForm(false);

        // Show success message
        alert('Thank you for registering! You are now a potential lifesaver.');
    };

    return (
        <Layout show3D variant3D="minimal">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
                        <Droplet className="w-8 h-8" />
                    </div>
                    <h1 className="section-title mb-4">Community Blood Donors</h1>
                    <p className="text-gray-600 text-lg">Find blood donors in your area or register yourself to save lives during obstetric emergencies.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    <div className="md:col-span-1 space-y-6">
                        <div className="card bg-gradient-to-br from-red-500 to-red-600 text-white border-none">
                            <h2 className="font-display font-bold text-xl mb-2">Be a Hero</h2>
                            <p className="text-red-100 text-sm mb-6">Register as a voluntary blood donor in your village to help mothers during delivery complications.</p>
                            <button
                                onClick={() => setShowRegisterForm(true)}
                                className="w-full py-3 bg-white text-red-600 font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-red-50 transition-colors"
                            >
                                <UserPlus className="w-5 h-5" /> Register to Donate
                            </button>
                        </div>

                        <div className="card border border-gray-200">
                            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                <Search className="w-5 h-5 text-gray-400" /> Filter Donors
                            </h3>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group Needed</label>
                            <select
                                value={bloodGroup}
                                onChange={(e: ChangeEvent<HTMLSelectElement>) => setBloodGroup(e.target.value)}
                                className="input-field mb-4"
                            >
                                <option value="All">All Blood Groups</option>
                                <option value="O+">O Positive (O+)</option>
                                <option value="O-">O Negative (O-)</option>
                                <option value="A+">A Positive (A+)</option>
                                <option value="A-">A Negative (A-)</option>
                                <option value="B+">B Positive (B+)</option>
                                <option value="B-">B Negative (B-)</option>
                                <option value="AB+">AB Positive (AB+)</option>
                                <option value="AB-">AB Negative (AB-)</option>
                            </select>
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <div className="card border border-gray-200 p-0 overflow-hidden bg-transparent">
                            <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                                <h2 className="font-display font-bold text-lg text-gray-900">Available Donors</h2>
                                <span className="text-sm font-medium text-red-600 bg-red-100 px-3 py-1 rounded-full">{filteredDonors.length} Found</span>
                            </div>

                            <div className="divide-y divide-gray-100">
                                {filteredDonors.length > 0 ? filteredDonors.map((donor: Donor, i: number) => (
                                    <div key={i} className="p-4 bg-white hover:bg-gray-50 transition-colors flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center font-bold text-lg border border-red-100 shrink-0">
                                                {donor.bloodGroup}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 flex items-center gap-2">
                                                    {donor.name} <ShieldCheck className="w-4 h-4 text-sage-500" />
                                                </h4>
                                                <div className="text-sm text-gray-500 mt-1 flex flex-wrap gap-x-4 gap-y-1">
                                                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {donor.village}</span>
                                                    <span className="flex items-center gap-1">Last Donated: {donor.lastDonated}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <a href={`tel:${donor.phone.replace(/\s/g, '')}`} className="btn-secondary whitespace-nowrap !py-2 !px-4 text-sm flex items-center gap-2 w-full sm:w-auto justify-center bg-white">
                                            <Phone className="w-4 h-4 text-red-500" /> Call Donor
                                        </a>
                                    </div>
                                )) : (
                                    <div className="p-8 text-center bg-white">
                                        <Droplet className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                        <p className="text-gray-500 font-medium">No registered donors found for this blood group.</p>
                                        <p className="text-sm text-gray-400 mt-1">Please try expanding your search or contact the nearest blood bank.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Registration Form Modal */}
            {showRegisterForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl max-w-md w-full p-6 relative"
                    >
                        <button
                            onClick={() => setShowRegisterForm(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 text-red-600">
                                <Droplet className="w-8 h-8" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Register as Donor</h2>
                            <p className="text-gray-500 text-sm mt-1">Your contribution can save a mother's life</p>
                        </div>

                        <form onSubmit={handleRegister} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-colors"
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Blood Group *
                                </label>
                                <select
                                    name="bloodGroup"
                                    value={formData.bloodGroup}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-colors"
                                    required
                                >
                                    <option value="O+">O Positive (O+)</option>
                                    <option value="O-">O Negative (O-)</option>
                                    <option value="A+">A Positive (A+)</option>
                                    <option value="A-">A Negative (A-)</option>
                                    <option value="B+">B Positive (B+)</option>
                                    <option value="B-">B Negative (B-)</option>
                                    <option value="AB+">AB Positive (AB+)</option>
                                    <option value="AB-">AB Negative (AB-)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Village/Location *
                                </label>
                                <input
                                    type="text"
                                    name="village"
                                    value={formData.village}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-colors"
                                    placeholder="Enter your village name"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone Number *
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-colors"
                                    placeholder="+91 9876543210"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-[1.02]"
                            >
                                Register Now
                            </button>

                            <p className="text-xs text-gray-400 text-center mt-2">
                                By registering, you agree to be contacted for blood donation requests in your area.
                            </p>
                        </form>
                    </motion.div>
                </div>
            )}
        </Layout>
    );
}