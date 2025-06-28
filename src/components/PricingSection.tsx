import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Zap, Crown, Rocket, Shield } from 'lucide-react';

interface PricingSectionProps {
  onBack: () => void;
}

const PricingSection: React.FC<PricingSectionProps> = ({ onBack }) => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'Free',
      icon: Shield,
      price: { monthly: 0, annual: 0 },
      description: 'Perfect for trying out EchoNova',
      features: [
        '5 analyses per month',
        'Basic deepfake detection',
        'Standard processing speed',
        'Email support',
        'Basic reporting'
      ],
      limitations: [
        'No blockchain verification',
        'No API access',
        'Limited file size (25MB)'
      ],
      gradient: 'from-gray-500 to-gray-600',
      popular: false
    },
    {
      name: 'Pro',
      icon: Zap,
      price: { monthly: 29, annual: 290 },
      description: 'For professionals and content creators',
      features: [
        '100 analyses per month',
        'Advanced AI models',
        'Priority processing',
        'Blockchain verification',
        'Grad-CAM visualizations',
        'API access (1000 calls/month)',
        'Priority support',
        'Detailed analytics'
      ],
      limitations: [],
      gradient: 'from-purple-500 to-pink-500',
      popular: true
    },
    {
      name: 'Enterprise',
      icon: Crown,
      price: { monthly: 199, annual: 1990 },
      description: 'For organizations and high-volume users',
      features: [
        'Unlimited analyses',
        'Custom AI model training',
        'Dedicated processing nodes',
        'White-label solutions',
        'Advanced blockchain features',
        'Unlimited API access',
        '24/7 dedicated support',
        'Custom integrations',
        'SLA guarantees',
        'On-premise deployment'
      ],
      limitations: [],
      gradient: 'from-yellow-500 to-orange-500',
      popular: false
    }
  ];

  const faqs = [
    {
      question: 'What happens if I exceed my monthly limit?',
      answer: 'You can upgrade your plan anytime or purchase additional analyses. We\'ll notify you before you reach your limit.'
    },
    {
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your subscription at any time. You\'ll continue to have access until the end of your billing period.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'We offer a 30-day money-back guarantee for all paid plans. Contact support for assistance.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely. We use end-to-end encryption and never store your files permanently. All data is processed securely and deleted after analysis.'
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="min-h-screen px-4 pt-20 pb-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-16"
        >
          <button
            onClick={onBack}
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </button>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              Simple Pricing
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Choose the perfect plan for your deepfake detection needs. All plans include our core AI detection technology.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4">
            <span className={`text-sm ${!isAnnual ? 'text-white' : 'text-gray-400'}`}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
                isAnnual ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-600'
              }`}
            >
              <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
                isAnnual ? 'translate-x-8' : 'translate-x-1'
              }`} />
            </button>
            <span className={`text-sm ${isAnnual ? 'text-white' : 'text-gray-400'}`}>
              Annual <span className="text-green-400">(Save 17%)</span>
            </span>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -10 }}
              className={`relative p-8 bg-black/20 backdrop-blur-sm rounded-2xl border transition-all duration-300 ${
                plan.popular 
                  ? 'border-purple-500/50 shadow-neon' 
                  : 'border-white/10 hover:border-purple-500/30'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}

              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${plan.gradient} flex items-center justify-center mb-6`}>
                <plan.icon className="h-8 w-8 text-white" />
              </div>

              <h3 className="text-2xl font-bold mb-2 text-white">{plan.name}</h3>
              <p className="text-gray-400 mb-6">{plan.description}</p>

              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-white">
                    ${isAnnual ? plan.price.annual : plan.price.monthly}
                  </span>
                  <span className="text-gray-400 ml-2">
                    {plan.price.monthly === 0 ? '' : isAnnual ? '/year' : '/month'}
                  </span>
                </div>
                {isAnnual && plan.price.monthly > 0 && (
                  <div className="text-sm text-gray-500">
                    ${(plan.price.annual / 12).toFixed(0)}/month billed annually
                  </div>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
                {plan.limitations.map((limitation, limitIndex) => (
                  <li key={limitIndex} className="flex items-start space-x-3 opacity-60">
                    <div className="w-5 h-5 mt-0.5 flex-shrink-0 flex items-center justify-center">
                      <div className="w-3 h-0.5 bg-gray-500" />
                    </div>
                    <span className="text-gray-500 text-sm">{limitation}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                plan.popular
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-neon-pink'
                  : 'bg-black/20 border border-white/20 text-white hover:border-purple-500/50'
              }`}>
                {plan.name === 'Free' ? 'Get Started' : 'Choose Plan'}
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="p-6 bg-black/20 backdrop-blur-sm rounded-xl border border-white/10"
              >
                <h3 className="text-lg font-semibold mb-3 text-white">{faq.question}</h3>
                <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-16 p-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/20"
        >
          <Rocket className="h-12 w-12 text-purple-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4 text-white">Ready to get started?</h2>
          <p className="text-gray-400 mb-6">Join thousands of users protecting their content with EchoNova</p>
          <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-white hover:shadow-neon-pink transition-all duration-300">
            Start Free Trial
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default PricingSection;