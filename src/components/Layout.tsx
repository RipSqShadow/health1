import { ReactNode } from 'react';

import { motion } from 'framer-motion';

import Navbar from './Navbar';

import Footer from './Footer';

import Scene3D from './Scene3D';

import AmbientBackground from './AmbientBackground';

import { pageTransition } from '@/lib/motion';



interface LayoutProps {

  children: ReactNode;

  show3D?: boolean;

  variant3D?: 'hero' | 'background' | 'minimal';

  ambient?: 'default' | 'warm' | 'cool' | 'hero' | 'none';

}



export default function Layout({

  children,

  show3D = false,

  variant3D = 'background',

  ambient = 'default',

}: LayoutProps) {

  return (

    <div className="min-h-screen flex flex-col relative overflow-x-hidden">

      {ambient !== 'none' && <AmbientBackground variant={ambient} />}

      {show3D && <Scene3D variant={variant3D} className="opacity-35 pointer-events-none fixed inset-0 -z-[5]" />}

      <Navbar />

      <motion.main

        className="flex-1 pt-16 relative z-10"

        initial={pageTransition.initial}

        animate={pageTransition.animate}

        transition={pageTransition.transition}

      >

        {children}

      </motion.main>

      <Footer />

    </div>

  );

}

