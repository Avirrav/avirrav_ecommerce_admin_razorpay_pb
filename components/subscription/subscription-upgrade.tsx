'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useParams, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Zap, Star, AlertTriangle, Shield, Sparkles, Users, Package, BarChart3, Headphones, Globe, Lock, CreditCard } from 'lucide-react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { cn } from '@/lib/utils';

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
      originalPrice: 50,
      duration: '6 months',
      icon: Zap,
      gradient: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700',
      buttonColor: 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600',
      features: [
        { text: '1 Store', icon: Package },
        { text: '10 Products', icon: BarChart3 },
        { text: 'Basic Analytics', icon: BarChart3 },
        { text: 'Email Support', icon: Headphones },
        { text: 'Mobile Responsive', icon: Globe }
      ],
      limits: {
        stores: 1,
        products: 10
      },
      popular: false,
      savings: '40% OFF',
      description: 'Perfect for testing'
    },
    {
      name: 'Basic',
      price: 3000,
      originalPrice: 5000,
      duration: '12 months',
      icon: Star,
      gradient: 'from-emerald-500 to-emerald-600',
      bgGradient: 'from-emerald-50 to-emerald-100',
      borderColor: 'border-emerald-200',
      textColor: 'text-emerald-700',
      buttonColor: 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600',
      features: [
        { text: 'Unlimited Stores', icon: Package },
        { text: 'Unlimited Products', icon: BarChart3 },
        { text: 'Advanced Analytics(Upcoming)', icon: BarChart3 },
        { text: 'Priority Support', icon: Headphones },
        { text: 'API Access', icon: Lock }
      ],
      limits: {
        stores: -1,
        products: -1
      },
      popular: true,
      savings: '40% OFF',
      description: 'Most popular choice'
    },
    {
      name: 'Advanced',
      price: 6000,
      originalPrice: 10000,
      duration: '12 months',
      icon: Crown,
      gradient: 'from-purple-500 to-purple-600',
      bgGradient: 'from-purple-50 to-purple-100',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-700',
      buttonColor: 'bg-purple-600 hover:purple-700 text-white border-purple-600',
      features: [
        { text: 'Everything in Basic', icon: Star },
        { text: 'Custom Store Front', icon: Sparkles },
        { text: 'Custom Domain', icon: Globe },
        { text: 'Dedicated Support', icon: Users },
        { text: 'Priority Updates', icon: BarChart3 }
      ],
      limits: {
        stores: -1,
        products: -1
      },
      popular: false,
      savings: '40% OFF',
      description: 'Enterprise-grade features'
    }
  ];

  useEffect(() => {
    // Load Razorpay SDK
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    if (searchParams.get('success')) {
      toast.success('Payment completed successfully!');
    }

    if (searchParams.get('canceled')) {
      toast.error('Payment was cancelled.');
    }

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
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
    <div className="h-screen overflow-hidden lg:overflow-auto bg-surface">
      {/* Mobile: Scrollable container */}
      <div className="h-full overflow-y-auto lg:overflow-visible lg:h-auto">
        <div className="min-h-full lg:min-h-screen flex flex-col">
          <div className="flex-1 max-w-7xl mx-auto px-4 py-4 lg:py-8">
            {/* Header Section - Compact */}
            <div className="text-center mb-[75px] lg:mb-[80px]">
              <div className="flex items-center justify-center mb-4 lg:mb-6">
                <div className="relative">
                  <div className="p-3 lg:p-4 bg-gradient-to-br from-primary/10 to-primary/20 rounded-xl lg:rounded-2xl border border-primary/20">
                    <Shield className="h-6 w-6 lg:h-8 lg:w-8 text-primary" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 lg:w-5 lg:h-5 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center">
                    <Sparkles className="h-2 w-2 lg:h-3 lg:w-3 text-white" />
                  </div>
                </div>
              </div>
              
              <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-foreground mb-3 lg:mb-4">
                Choose Your Plan
              </h1>
              
              {message ? (
                <div className="bg-critical-subdued border border-critical rounded-lg p-3 lg:p-4 max-w-2xl mx-auto mb-4 lg:mb-6">
                  <div className="flex items-center justify-center">
                    <AlertTriangle className="h-4 w-4 lg:h-5 lg:w-5 text-critical mr-2 lg:mr-3 flex-shrink-0" />
                    <p className="text-sm lg:text-base text-critical font-medium">{message}</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 lg:space-y-4">
                  <p className="text-lg lg:text-xl text-muted-foreground mb-4 lg:mb-6">
                    Unlock the full potential of your e-commerce business
                  </p>
                </div>
              )}
              
              <div className="flex items-center justify-center gap-2 mt-4 lg:mt-6">
                <span className="text-xs lg:text-sm text-muted-foreground">
                  Secure payment • Cancel anytime
                </span>
              </div>
            </div>

            {/* Plans Grid - Responsive and Compact */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
              {plans.map((plan) => {
                const Icon = plan.icon;
                return (
                  <Card 
                    key={plan.name} 
                    className={cn(
                      "relative border-2 transition-all duration-300 hover:shadow-lg group",
                      plan.popular 
                        ? "border-primary shadow-lg lg:scale-105 ring-2 ring-primary/20" 
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 lg:-top-4 left-1/2 transform -translate-x-1/2 z-10">
                        <Badge className="bg-primary text-primary-foreground px-3 lg:px-4 py-1 lg:py-1.5 font-semibold shadow-lg text-xs lg:text-sm">
                          <Star className="h-3 w-3 mr-1" />
                          Most Popular
                        </Badge>
                      </div>
                    )}

                    {plan.savings && (
                      <div className="absolute -top-2 -right-2 z-10">
                        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-2 lg:px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                          {plan.savings}
                        </div>
                      </div>
                    )}
                    
                    <CardHeader className="text-center pb-3 lg:pb-4 relative overflow-hidden">
                      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-5", plan.bgGradient)} />
                      
                      <div className="relative z-10">
                        <div className={cn(
                          "w-12 h-12 lg:w-14 lg:h-14 mx-auto mb-3 lg:mb-4 rounded-xl lg:rounded-2xl flex items-center justify-center bg-gradient-to-br shadow-lg",
                          plan.gradient
                        )}>
                          <Icon className="h-6 w-6 lg:h-7 lg:w-7 text-white" />
                        </div>
                        
                        <CardTitle className="text-xl lg:text-2xl font-bold text-foreground mb-1 lg:mb-2">
                          {plan.name}
                        </CardTitle>
                        
                        <CardDescription className="text-sm lg:text-base text-muted-foreground mb-3 lg:mb-4">
                          {plan.description}
                        </CardDescription>
                        
                        <div className="space-y-1 lg:space-y-2">
                          <div className="flex items-center justify-center gap-2">
                            <span className="text-2xl lg:text-3xl font-bold text-foreground">₹{plan.price}</span>
                            <span className="text-base lg:text-lg text-muted-foreground line-through">₹{plan.originalPrice}</span>
                          </div>
                          <p className="text-xs lg:text-sm text-muted-foreground">per {plan.duration}</p>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0 pb-4 lg:pb-6">
                      <ul className="space-y-2 lg:space-y-3 mb-4 lg:mb-6">
                        {plan.features.map((feature, index) => {
                          const FeatureIcon = feature.icon;
                          return (
                            <li key={index} className="flex items-center group/item">
                              <div className="p-1 lg:p-1.5 bg-success-subdued rounded-lg mr-2 lg:mr-3 group-hover/item:bg-success-surface transition-colors">
                                <Check className="h-3 w-3 text-success" />
                              </div>
                              <div className="flex items-center gap-1 lg:gap-2">
                                <FeatureIcon className="h-3 w-3 lg:h-4 lg:w-4 text-muted-foreground" />
                                <span className="text-xs lg:text-sm text-foreground font-medium">{feature.text}</span>
                              </div>
                            </li>
                          );
                        })}
                      </ul>

                      <Button
                        onClick={() => handleSubscribe(plan.name)}
                        disabled={loading === plan.name}
                        className={cn(
                          "w-full h-10 lg:h-12 font-semibold transition-all duration-200 shadow-lg hover:shadow-xl text-sm lg:text-base",
                          plan.popular 
                            ? "bg-primary hover:bg-primary/90 text-primary-foreground border-primary" 
                            : plan.buttonColor
                        )}
                        size="lg"
                      >
                        {loading === plan.name ? (
                          <div className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-3 w-3 lg:h-4 lg:w-4 border-b-2 border-white"></div>
                            Processing...
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <CreditCard className="h-3 w-3 lg:h-4 lg:w-4" />
                            Subscribe to {plan.name}
                          </div>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};