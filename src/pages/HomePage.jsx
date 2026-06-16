import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheckCircle, FiFileText, FiSliders } from 'react-icons/fi';
import { ROUTES } from '../utils/constants';
import { useAuth } from '../contexts/AuthContext';
import { useCV } from '../contexts/CVContext';
import TemplateThumbnail from '../components/TemplateThumbnail';

const HomePage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const { createCV } = useCV();

    const handleStart = async () => {
        if (isAuthenticated) {
            try {
                const newCV = await createCV('modern-1');
                navigate(`${ROUTES.EDITOR}/${newCV.id}`);
            } catch (error) {
                navigate(ROUTES.DASHBOARD);
            }
        } else {
            navigate(`${ROUTES.REGISTER}?plan=free`);
        }
    };

    const features = [
        {
            icon: <FiCheckCircle className="text-4xl text-brand-burgundy" />,
            title: t('home.features.atsTitle', 'Optimisé ATS'),
            description: t('home.features.atsDesc', 'Format lisible par les robots de recrutement.'),
        },
        {
            icon: <FiFileText className="text-4xl text-brand-burgundy" />,
            title: t('home.features.exportTitle', 'Export PDF'),
            description: t('home.features.exportDesc', 'Téléchargement en PDF haute qualité.'),
        },
        {
            icon: <FiSliders className="text-4xl text-brand-burgundy" />,
            title: t('home.features.customTitle', 'Personnalisation'),
            description: t('home.features.customDesc', 'Modifiez les couleurs et polices facilement.'),
        }
    ];

    const testimonials = [
        {
            name: "Sophie Martin",
            role: t('home.testimonials.t1Role', "Directrice Marketing"),
            text: t('home.testimonials.t1Text', "Grâce à cet outil, j'ai refait mon CV en 15 minutes et décroché 3 entretiens la même semaine. Les modèles sont d'un professionnalisme incroyable."),
            initials: "SM",
        },
        {
            name: "Lucas Dubois",
            role: t('home.testimonials.t2Role', "Développeur Full-Stack"),
            text: t('home.testimonials.t2Text', "L'optimisation ATS est bluffante. Mon CV passe enfin les filtres automatiques des grandes entreprises tech. Un outil indispensable pour sa carrière."),
            initials: "LD",
        },
        {
            name: "Amélie Leroy",
            role: t('home.testimonials.t3Role', "Chef de Projet"),
            text: t('home.testimonials.t3Text', "J'adore la simplicité d'utilisation et le rendu final en PDF. C'est exactement ce que je cherchais : élégant, rapide et très efficace."),
            initials: "AL",
        }
    ];

    return (
        <div className="bg-brand-beige overflow-x-hidden font-sans text-brand-brown selection:bg-brand-burgundy selection:text-white">
            {/* 1. HERO SECTION */}
            <section className="relative min-h-[90vh] flex items-center pt-20 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                        
                        {/* Left Side: Copy & CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center lg:text-left z-10"
                        >
                            <h1 className="text-6xl sm:text-7xl lg:text-[85px] font-serif font-bold text-brand-brown mb-2 leading-[1.1] tracking-tight">
                                {t('home.hero.titlePart1', 'Créez un CV ')} <br className="hidden lg:block"/>
                                <span className="font-cursive text-brand-burgundy font-normal text-7xl sm:text-8xl lg:text-[110px] block mt-2 transform -rotate-2">
                                    {t('home.hero.titlePart2', 'Professionnel.')}
                                </span>
                            </h1>
                            <p className="text-xl sm:text-2xl text-brand-brown/80 mt-8 mb-12 max-w-xl mx-auto lg:mx-0 font-serif italic leading-relaxed">
                                {t('home.hero.subtitle', 'Un outil simple et élégant pour générer le CV parfait en quelques minutes. Démarquez-vous dès aujourd\'hui.')}
                            </p>

                            <div className="flex justify-center lg:justify-start">
                                <button
                                    onClick={handleStart}
                                    className="group px-10 py-5 bg-brand-brown text-brand-beige rounded-sm font-serif italic text-xl hover:bg-brand-burgundy transition-all duration-300 shadow-xl flex items-center gap-4 hover:-translate-y-1"
                                >
                                    {t('home.hero.button', 'Créer mon CV')}
                                    <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
                                </button>
                            </div>
                        </motion.div>

                        {/* Right Side: Floating CV Mockups */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="relative h-[600px] w-full flex justify-center items-center mt-10 lg:mt-0"
                        >
                            {/* Background template 1 */}
                            <motion.div 
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                                className="absolute z-10 shadow-xl bg-white p-3 -rotate-6 -translate-x-12 -translate-y-12 border border-brand-cream" 
                                style={{ width: '65%', height: '70%' }}
                            >
                                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-4 bg-white/60 backdrop-blur-sm border border-gray-100 shadow-sm rotate-2 z-30"></div>
                                <div className="w-full h-full relative bg-gray-50 overflow-hidden opacity-60">
                                     <TemplateThumbnail templateId="modern-1" />
                                </div>
                            </motion.div>

                            {/* Background template 2 */}
                            <motion.div 
                                animate={{ y: [0, 8, 0] }}
                                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                                className="absolute z-10 shadow-xl bg-white p-3 rotate-12 translate-x-16 translate-y-12 border border-brand-cream" 
                                style={{ width: '70%', height: '75%' }}
                            >
                                <div className="absolute -top-2 left-4 w-4 h-4 rounded-full bg-[#8B4513] shadow-md z-30"></div>
                                <div className="w-full h-full relative bg-gray-50 overflow-hidden opacity-80">
                                     <TemplateThumbnail templateId="minimalist-1" />
                                </div>
                            </motion.div>

                            {/* Main template */}
                            <motion.div 
                                animate={{ y: [0, -5, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 2 }}
                                className="absolute z-20 shadow-2xl bg-white p-4 -rotate-2 border border-brand-cream" 
                                style={{ width: '80%', height: '85%' }}
                            >
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-brand-burgundy shadow-sm z-30"></div>
                                <div className="w-full h-full relative bg-white overflow-hidden border border-gray-100">
                                     <TemplateThumbnail templateId="professional-1" />
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 2. FEATURES SECTION */}
            <section className="py-24 bg-brand-cream/50 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-brown/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-brown/20 to-transparent"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-brand-brown mb-4">
                            Nos fonctionnalités <span className="font-cursive text-brand-burgundy font-normal transform inline-block -rotate-2">phares.</span>
                        </h2>
                        <p className="text-xl font-serif italic text-brand-brown/70 max-w-2xl mx-auto">
                            Tout ce dont vous avez besoin pour concevoir un CV remarquable.
                        </p>
                    </div>
                    
                    <div className="flex flex-wrap justify-center gap-10 relative z-10">
                        {features.map((feat, i) => (
                            <motion.div 
                                key={i} 
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.2 }}
                                className={`bg-white p-10 shadow-xl relative w-full md:w-[350px] border border-gray-100 
                                    ${i % 2 === 0 ? 'rotate-[-2deg]' : 'rotate-[3deg]'} 
                                    hover:rotate-0 hover:z-20 transition-all duration-300 hover:-translate-y-2`}
                            >
                                {/* Tape effect */}
                                <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/40 backdrop-blur-md shadow-sm border border-gray-200/30 ${i % 2 === 0 ? 'rotate-[4deg]' : 'rotate-[-3deg]'}`}></div>
                                
                                <div className="mb-8 flex justify-center transform transition-transform hover:scale-110">
                                    {feat.icon}
                                </div>
                                <h3 className="text-2xl font-serif font-bold text-brand-brown mb-4 text-center">{feat.title}</h3>
                                <div className="w-12 h-px bg-brand-burgundy/30 mx-auto mb-4"></div>
                                <p className="text-brand-brown/80 text-center font-serif text-lg leading-relaxed">{feat.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. TESTIMONIALS SECTION */}
            <section className="py-24 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-brand-brown mb-4">
                            Ils ont trouvé leur <span className="font-cursive text-brand-burgundy font-normal transform inline-block rotate-2">job idéal.</span>
                        </h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {testimonials.map((testi, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="bg-brand-cream/40 p-10 shadow-sm border-t-4 border-brand-burgundy flex flex-col hover:bg-brand-cream/60 transition-colors"
                            >
                                <div className="flex items-center gap-1 mb-8 text-brand-burgundy">
                                    {[...Array(5)].map((_, j) => (
                                        <svg key={j} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-brand-brown font-serif italic text-xl leading-relaxed mb-10 flex-grow">"{testi.text}"</p>
                                <div className="flex items-center gap-4 mt-auto">
                                    <div className="w-14 h-14 rounded-full flex items-center justify-center font-serif font-bold text-xl bg-white text-brand-burgundy shadow-sm border border-brand-brown/10">
                                        {testi.initials}
                                    </div>
                                    <div>
                                        <h4 className="font-bold font-serif text-brand-brown text-lg">{testi.name}</h4>
                                        <p className="text-sm text-brand-brown/60 font-medium font-sans uppercase tracking-wider mt-1">{testi.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
