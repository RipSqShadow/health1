import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { useLanguage } from '@/i18n/LanguageContext';
import { ClipboardList, Hospital, Bus, Users, Droplet, Save } from 'lucide-react';

export default function BirthPreparednessPage() {
  const { t } = useLanguage();
  const userStr = localStorage.getItem('maatritrack-user');
  const user = userStr ? JSON.parse(userStr) : null;

  const [formData, setFormData] = useState({
    hospital: '',
    transport: '',
    bloodDonor1: '',
    bloodDonor1Phone: '',
    bloodDonor2: '',
    bloodDonor2Phone: '',
    companion: '',
    companionPhone: '',
    fundsSaved: false,
    bagPacked: false
  });

  useEffect(() => {
    const activePhone = user?.phone;
    if (!activePhone) return;

    fetch(`/api/birth-preparedness?phone=${encodeURIComponent(activePhone)}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.hospital !== undefined) {
          setFormData({
            hospital: data.hospital || '',
            transport: data.transport || '',
            bloodDonor1: data.bloodDonor1 || '',
            bloodDonor1Phone: data.bloodDonor1Phone || '',
            bloodDonor2: data.bloodDonor2 || '',
            bloodDonor2Phone: data.bloodDonor2Phone || '',
            companion: data.companion || '',
            companionPhone: data.companionPhone || '',
            fundsSaved: !!data.fundsSaved,
            bagPacked: !!data.bagPacked
          });
        }
      })
      .catch(err => console.error('Error fetching birth preparedness:', err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSave = async () => {
    try {
      const activePhone = user?.phone || '+919876543210';
      const res = await fetch('/api/birth-preparedness', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, phone: activePhone }),
      });
      if (res.ok) {
        alert('Birth Preparedness Plan Saved!');
      } else {
        alert('Failed to save birth preparedness plan');
      }
    } catch (err) {
      console.error(err);
      alert('Network error while saving birth plan');
    }
  };

  return (
    <Layout show3D variant3D="minimal">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="w-16 h-16 bg-coral-100 rounded-full flex items-center justify-center mx-auto mb-4 text-coral-600">
            <ClipboardList className="w-8 h-8" />
          </div>
          <h1 className="section-title mb-4">{t('birthPreparedness')}</h1>
          <p className="text-gray-600 text-lg">Plan ahead for a safe delivery. Fill out these details with your family and ASHA worker.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-6">
          
          {/* Facility & Transport */}
          <div className="card">
            <h2 className="font-display font-bold text-xl text-maatri-900 mb-4 flex items-center gap-2 border-b pb-2">
              <Hospital className="w-6 h-6 text-coral-500" /> Facility & Transport
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Delivery Hospital</label>
                <div className="relative">
                  <Hospital className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="text" name="hospital" value={formData.hospital} onChange={handleChange} placeholder="e.g. District Hospital, Rampur" className="input-field pl-10" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Transport Arrangement</label>
                <div className="relative">
                  <Bus className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select name="transport" value={formData.transport} onChange={handleChange} className="input-field pl-10">
                    <option value="">Select Transport</option>
                    <option value="108">108 Ambulance</option>
                    <option value="private">Private Vehicle</option>
                    <option value="rented">Rented Cab/Auto</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Blood Donors */}
          <div className="card">
            <h2 className="font-display font-bold text-xl text-maatri-900 mb-4 flex items-center gap-2 border-b pb-2">
              <Droplet className="w-6 h-6 text-coral-500" /> Blood Donors (In case of emergency)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Blood Donor 1 Name</label>
                <input type="text" name="bloodDonor1" value={formData.bloodDonor1} onChange={handleChange} className="input-field" placeholder="Name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Donor 1 Phone</label>
                <input type="tel" name="bloodDonor1Phone" value={formData.bloodDonor1Phone} onChange={handleChange} className="input-field" placeholder="Phone Number" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Blood Donor 2 Name</label>
                <input type="text" name="bloodDonor2" value={formData.bloodDonor2} onChange={handleChange} className="input-field" placeholder="Name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Donor 2 Phone</label>
                <input type="tel" name="bloodDonor2Phone" value={formData.bloodDonor2Phone} onChange={handleChange} className="input-field" placeholder="Phone Number" />
              </div>
            </div>
          </div>

          {/* Support System */}
          <div className="card">
            <h2 className="font-display font-bold text-xl text-maatri-900 mb-4 flex items-center gap-2 border-b pb-2">
              <Users className="w-6 h-6 text-coral-500" /> Support System
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Birth Companion</label>
                <input type="text" name="companion" value={formData.companion} onChange={handleChange} className="input-field" placeholder="Who will accompany you?" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Companion Phone</label>
                <input type="tel" name="companionPhone" value={formData.companionPhone} onChange={handleChange} className="input-field" placeholder="Phone Number" />
              </div>
            </div>
          </div>

          {/* Readiness Checklist */}
          <div className="card">
            <h2 className="font-display font-bold text-xl text-maatri-900 mb-4 flex items-center gap-2 border-b pb-2">
              <Save className="w-6 h-6 text-coral-500" /> Readiness Checklist
            </h2>
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" name="fundsSaved" checked={formData.fundsSaved} onChange={handleChange} className="w-5 h-5 text-coral-500 rounded border-gray-300 focus:ring-coral-500" />
                <span className="text-gray-700">Funds saved for transport and emergency expenses</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" name="bagPacked" checked={formData.bagPacked} onChange={handleChange} className="w-5 h-5 text-coral-500 rounded border-gray-300 focus:ring-coral-500" />
                <span className="text-gray-700">Hospital bag packed (clothes, baby clothes, sanitary pads, medical records)</span>
              </label>
            </div>
          </div>

          <button onClick={handleSave} className="btn-primary w-full py-4 text-lg mt-6 shadow-coral hover:shadow-lg">
            Save Birth Preparedness Plan
          </button>
        </motion.div>
      </div>
    </Layout>
  );
}
