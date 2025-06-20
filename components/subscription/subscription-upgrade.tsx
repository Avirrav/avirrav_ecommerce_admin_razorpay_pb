'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useParams, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Zap, Star } from 'lucide-react';
import { toast } from 'react-hot-toast';
import axios from 'axios';

interface SubscriptionUpgradeProps {
  message?: string;
}

export const SubscriptionUpgrade = ({ message }: SubscriptionUpgradeProps) => {
  const { user } = useUser();
  const params = useParams();
  const [loading, setLoading] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const searchParams = useSearchParams();

  const plans = [
    {
      name: 'Trial',
      price: 30,
      duration: '6 months',
      icon: Zap,
      color: 'bg-blue-500',
      features: [
        '1 Store',
        '10 Products',
        'Basic Analytics',
        'Email Support',
        'Mobile Responsive'
      ],
      limits: {
        stores: 1,
        products: 10
      },
      popular: false
    },
    {
      name: 'Basic',
      price: 2000,
      duration: '12 months',
      icon: Star,
      color: 'bg-green-500',
      features: [
        'Unlimited Stores',
        'Unlimited Products',
        'Advanced Analytics',
        'Priority Support',
        'Custom Domain',
        'API Access'
      ],
      limits: {
        stores: -1,
        products: -1
      },
      popular: true
    },
    {
      name: 'Advanced',
      price: 6000,
      duration: '12 months',
      icon: Crown,
      color: 'bg-purple-500',
      features: [
        'Everything in Basic',
        'White Label Solution',
        'Advanced Integrations',
        'Dedicated Support',
        'Custom Features',
        'Priority Updates'
      ],
      limits: {
        stores: -1,
        products: -1
      },
      popular: false
    }
  ];
  useEffect(() => {
    // Load Razorpay SDK
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    if (searchParams.get('success')) {
      toast.success('Payment completed.');
    }

    if (searchParams.get('canceled')) {
      toast.error('Something went wrong.');
    }

    return () => {
      document.body.removeChild(script);
    };
  }, [searchParams]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubscribe = async (planName: string) => {
    if (!user) {
      toast.error('Please sign in to subscribe');
      return;
    }

    try {
      setLoading(planName);

      // Create subscription order
      const response = await axios.post(`/api/stores/create-subscription`, {
        planName: planName
      });

      const { orderId, amount, keyId, description } = response.data;

      // Initialize Razorpay payment
      const options = {
        key: keyId,
        amount: amount,
        currency: 'INR',
        name: 'Pugly Dashboard',
        description: description,
        order_id: orderId,
        handler: async (response: any) => {
          try {
            // Verify payment
            await axios.post(`/api/stores/verify-subscription-payment`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              userId: user.id,
              planName: planName
            });

            toast.success('Subscription activated successfully!');
            window.location.reload();
          } catch (error) {
            console.error('Payment verification failed:', error);
            toast.error('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: user.fullName || '',
          email: user.primaryEmailAddress?.emailAddress || '',
        },
        theme: {
          color: '#5c6ac4'
        },
        modal: {
          ondismiss: () => {
            setLoading(null);
          }
        }
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error('Subscription error:', error);
      toast.error('Failed to initiate subscription. Please try again.');
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Choose Your Plan
        </h1>
        {message ? (
          <p className="text-lg text-red-600 mb-4">{message}</p>
        ) : (
          <div className="space-y-2">
            <p className="text-lg text-gray-600 mb-2">
              Unlock the full potential of your e-commerce business
            </p>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-2xl mx-auto">
              <p className="text-red-800 font-medium">
                🚫 Free Plan: 0 stores, 0 products - Subscribe to get started!
              </p>
            </div>
          </div>
        )}
        <p className="text-sm text-gray-500 mt-4">
          All plans include 24/7 support and regular updates
        </p>
      </div>

      {/* Plans Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {plans.map((plan) => {
          const Icon = plan.icon;
          return (
            <Card 
              key={plan.name} 
              className={`relative ${plan.popular ? 'ring-2 ring-blue-500 shadow-lg scale-105' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-500 text-white px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className={`w-12 h-12 ${plan.color} rounded-lg mx-auto mb-4 flex items-center justify-center`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-gray-600">
                  Perfect for {plan.name.toLowerCase()} users
                </CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">₹{plan.price}</span>
                  <span className="text-gray-600 ml-2">/ {plan.duration}</span>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleSubscribe(plan.name)}
                  disabled={loading === plan.name}
                  className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                  variant={plan.popular ? 'primary' : 'outline'}
                >
                  {loading === plan.name ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    `Subscribe to ${plan.name}`
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Current Plan Notice */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
          📋 Plan Comparison
        </h3>
        <div className="grid md:grid-cols-4 gap-4 text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-medium text-red-900 mb-2">Free Plan</h4>
            <p className="text-sm text-red-700">0 Stores • 0 Products</p>
            <p className="text-xs text-red-600 mt-1">Subscribe to get started!</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Trial Plan</h4>
            <p className="text-sm text-blue-700">1 Store • 10 Products</p>
            <p className="text-xs text-blue-600 mt-1">6 months • ₹30</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-medium text-green-900 mb-2">Basic Plan</h4>
            <p className="text-sm text-green-700">Unlimited • Unlimited</p>
            <p className="text-xs text-green-600 mt-1">12 months • ₹2000</p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 className="font-medium text-purple-900 mb-2">Advanced Plan</h4>
            <p className="text-sm text-purple-700">Unlimited • Unlimited</p>
            <p className="text-xs text-purple-600 mt-1">12 months • ₹6000</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-lg p-8 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
          Frequently Asked Questions
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Why is the free plan limited?</h4>
            <p className="text-sm text-gray-600">The free plan is designed to let you explore the platform. To create stores and products, you need an active subscription.</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Can I change plans later?</h4>
            <p className="text-sm text-gray-600">Yes, you can upgrade or downgrade your plan at any time.</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">What payment methods do you accept?</h4>
            <p className="text-sm text-gray-600">We accept all major credit cards, debit cards, and UPI payments.</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Do you offer refunds?</h4>
            <p className="text-sm text-gray-600">Yes, we offer a 30-day money-back guarantee on all plans.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};