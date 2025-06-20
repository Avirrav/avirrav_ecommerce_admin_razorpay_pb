'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useParams, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Zap, Star, AlertTriangle, Shield } from 'lucide-react';
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
      color: 'bg-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700',
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
      color: 'bg-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      textColor: 'text-emerald-700',
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
      color: 'bg-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-700',
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
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          {message ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-2xl mx-auto mb-6">
              <div className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-red-600 mr-3" />
                <p className="text-red-800 font-medium">{message}</p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-lg text-gray-600 mb-4">
                Unlock the full potential of your e-commerce business
              </p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-2xl mx-auto">
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-red-600 mr-3" />
                  <p className="text-red-800 font-medium">
                    Free Plan: 0 stores, 0 products - Subscribe to get started!
                  </p>
                </div>
              </div>
            </div>
          )}
          <p className="text-sm text-gray-500 mt-4">
            All plans include 24/7 support and regular updates
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <Card 
                key={plan.name} 
                className={`relative border-2 transition-all duration-200 hover:shadow-lg ${
                  plan.popular 
                    ? 'border-blue-500 shadow-md scale-105' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-4 py-1 font-semibold">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className={`w-12 h-12 ${plan.color} rounded-lg mx-auto mb-4 flex items-center justify-center`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">{plan.name}</CardTitle>
                  <CardDescription className="text-gray-600">
                    Perfect for {plan.name.toLowerCase()} users
                  </CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-gray-900">₹{plan.price}</span>
                    <span className="text-gray-600 ml-2">/ {plan.duration}</span>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <div className="p-1 bg-emerald-50 rounded-full mr-3">
                          <Check className="h-3 w-3 text-emerald-600" />
                        </div>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handleSubscribe(plan.name)}
                    disabled={loading === plan.name}
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                        : 'bg-white border border-gray-300 text-gray-900 hover:bg-gray-50'
                    }`}
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
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center flex items-center justify-center">
            <Shield className="h-5 w-5 mr-2 text-blue-600" />
            Plan Comparison
          </h3>
          <div className="grid md:grid-cols-4 gap-4 text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-red-900 mb-2">Free Plan</h4>
              <p className="text-sm text-red-700 font-medium">0 Stores • 0 Products</p>
              <p className="text-xs text-red-600 mt-1">Subscribe to get started!</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Trial Plan</h4>
              <p className="text-sm text-blue-700 font-medium">1 Store • 10 Products</p>
              <p className="text-xs text-blue-600 mt-1">6 months • ₹30</p>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <h4 className="font-semibold text-emerald-900 mb-2">Basic Plan</h4>
              <p className="text-sm text-emerald-700 font-medium">Unlimited • Unlimited</p>
              <p className="text-xs text-emerald-600 mt-1">12 months • ₹2000</p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-semibold text-purple-900 mb-2">Advanced Plan</h4>
              <p className="text-sm text-purple-700 font-medium">Unlimited • Unlimited</p>
              <p className="text-xs text-purple-600 mt-1">12 months • ₹6000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};