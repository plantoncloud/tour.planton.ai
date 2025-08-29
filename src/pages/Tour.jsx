
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Tour data embedded directly
const TOUR_STEPS = [
    {
        step_number: 1,
        title: "Main Dashboard",
        description: "Get a bird's-eye view of your entire infrastructure. Monitor resources, recent activities, and key metrics all in one place.",
        image_url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/a30b2df17_Xnapper-2025-08-29-071655.png",
        callouts: [
            {number: 1, x: 10, y: 40, title: "Navigation Menu", description: "Navigate easily between different hubs like Service Hub, Agent Store, and Connections."},
            {number: 2, x: 45, y: 35, title: "Summary Cards", description: "Track key metrics such as active users, automation minutes, and total resources."},
            {number: 3, x: 55, y: 80, title: "Recent Activities", description: "See the latest pipelines and stack jobs at a glance to stay on top of deployments."}
        ]
    },
    {
        step_number: 2,
        title: "Deployment Component Store",
        description: "Browse a rich marketplace of pre-built components to quickly deploy services and infrastructure across any cloud.",
        image_url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/9c682fceb_Xnapper-2025-08-29-071702.png",
        callouts: [
            {number: 1, x: 15, y: 50, title: "Smart Filters", description: "Filter components by cloud provider or type to find exactly what you need in seconds."},
            {number: 2, x: 55, y: 50, title: "Component Library", description: "Explore a wide range of components, from databases and clusters to serverless functions."},
            {number: 3, x: 88, y: 36, title: "One-Click Deploy", description: "Deploy any component directly to your connected cloud account with a single click."}
        ]
    },
    {
        step_number: 3,
        title: "Cloud & Service Connections",
        description: "Securely link your cloud providers, source code repositories, and other services to the platform.",
        image_url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/cdbc42ebd_Xnapper-2025-08-29-071716.png",
        callouts: [
            {number: 1, x: 50, y: 55, title: "Provider Grid", description: "Connect to major clouds like AWS, Azure, and GCP, plus tools like GitHub and Docker."},
            {number: 2, x: 23, y: 50, title: "Guided Setup", description: "Click 'Connect' to start a simple, guided process for adding new account credentials securely."}
        ]
    },
    {
        step_number: 4,
        title: "IaC Module Registry",
        description: "Manage and version your reusable Infrastructure-as-Code modules for consistent and repeatable deployments.",
        image_url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/f5a918138_Xnapper-2025-08-29-071725.png",
        callouts: [
            {number: 1, x: 40, y: 50, title: "Versioned Modules", description: "View all your Terraform, Pulumi, and other IaC modules, complete with version history."},
            {number: 2, x: 70, y: 45, title: "Promote & Inspect", description: "Promote modules to different environments or jump directly to the source code for review."}
        ]
    },
    {
        step_number: 5,
        title: "Infra Hub - Visual Designer",
        description: "Visually map out and manage your cloud resources and their dependencies with an interactive graph.",
        image_url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/1a6bb2f68_Xnapper-2025-08-29-071733.png",
        callouts: [
            {number: 1, x: 50, y: 60, title: "Resource Graph", description: "See your entire infrastructure landscape, from VPCs to individual services, in a clear dependency graph."},
            {number: 2, x: 40, y: 28, title: "View Toggles", description: "Switch between a high-level view of your cloud inventory and specific infrastructure projects."}
        ]
    },
    {
        step_number: 6,
        title: "Service Hub Overview",
        description: "Organize and monitor all your microservices and their associated CI/CD pipelines from a central hub.",
        image_url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/d51915c5e_Xnapper-2025-08-29-071751.png",
        callouts: [
            {number: 1, x: 35, y: 60, title: "Recent Pipelines", description: "Keep track of recent build and deployment pipelines for all your services."},
            {number: 2, x: 75, y: 60, title: "Services List", description: "View a list of all deployed services, with links to their source code repositories."},
            {number: 3, x: 90, y: 40, title: "Add New Service", description: "Onboard a new service and configure its deployment pipeline in just a few steps."}
        ]
    },
    {
        step_number: 7,
        title: "Source Code Template Library",
        description: "Accelerate development by using standardized templates for new services and CI/CD workflows.",
        image_url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/21d5bbedc_Xnapper-2025-08-29-071801.png",
        callouts: [
            {number: 1, x: 40, y: 60, title: "Template Library", description: "Choose from a library of templates for different languages and frameworks, like Next.js or Java."},
            {number: 2, x: 80, y: 50, title: "Filter by Type", description: "Filter templates by type, such as GitHub Actions, or maintainer to quickly find what you need."}
        ]
    },
    {
        step_number: 8,
        title: "Service Configuration",
        description: "Fine-tune every aspect of a service's deployment, from pipeline settings to build methods.",
        image_url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/972cf266e_Xnapper-2025-08-29-071810.png",
        callouts: [
            {number: 1, x: 50, y: 50, title: "Pipeline Configuration", description: "Configure how your service is built and deployed, choosing managed or self-managed pipelines."},
            {number: 2, x: 50, y: 80, title: "Deployment Rules", description: "Set up deployment triggers, pull request rules, and preview environments to match your workflow."}
        ]
    },
    {
        step_number: 9,
        title: "Visual Pipeline Builder",
        description: "Visualize and manage the stages of your deployment pipelines in real-time.",
        image_url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/9aa8d8023_Xnapper-2025-08-29-071818.png",
        callouts: [
            {number: 1, x: 20, y: 70, title: "Pipeline Stages", description: "Track the progress of your pipeline through each stage, from build to deploy."},
            {number: 2, x: 60, y: 70, title: "Stage Details", description: "Click on a stage to see detailed steps and their execution status and duration."},
            {number: 3, x: 60, y: 35, title: "Run Summary", description: "Get a quick summary of the pipeline run, including trigger details, status, and total duration."}
        ]
    }
];

export default function Tour() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [calloutsVisible, setCalloutsVisible] = useState(false);
  const [showDemoPrompt, setShowDemoPrompt] = useState(false);
  const [showClosingScreen, setShowClosingScreen] = useState(false); // New state for closing screen

  useEffect(() => {
    // Show callouts only if tour is started, no demo prompt, and no closing screen
    if (isStarted && !showDemoPrompt && !showClosingScreen) {
      const timer = setTimeout(() => setCalloutsVisible(true), 500);
      return () => clearTimeout(timer);
    } else {
      setCalloutsVisible(false); // Hide callouts if any of these special states are active
    }
  }, [currentStep, isStarted, showDemoPrompt, showClosingScreen]); // Add showClosingScreen to dependencies

  const handleStart = () => {
    setIsStarted(true);
    setCalloutsVisible(false);
    setShowDemoPrompt(false);
    setShowClosingScreen(false); // Reset closing screen state on start
  };

  const handleNext = () => {
    // Show demo prompt after step 4 (IaC Module Registry) - which is index 3
    if (currentStep === 3 && !showDemoPrompt) {
      setCalloutsVisible(false); // Hide callouts when prompt appears
      setShowDemoPrompt(true);
      return; // Stop here, don't advance the step yet
    }

    // Check if we've reached the last step (index 8 for 9 steps)
    if (currentStep === TOUR_STEPS.length - 1) {
      setCalloutsVisible(false); // Hide callouts
      setIsStarted(false); // End the tour
      setShowClosingScreen(true); // Show the closing screen
      return;
    }

    // Continue to next step for all other cases
    if (currentStep < TOUR_STEPS.length - 1) {
      setCalloutsVisible(false); // Hide callouts for transition
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 200);
    }
  };

  const handleKeepGoing = () => {
    setShowDemoPrompt(false); // Hide the modal
    setTimeout(() => {
      setCurrentStep(prev => prev + 1); // Advance to the next step
      setCalloutsVisible(true); // Show callouts for the new step after transition
    }, 300); // Slightly longer delay for smoother transition
  };

  const handleScheduleDemo = () => {
    window.open('https://calendly.com/your-demo-link', '_blank'); // Replace with actual link
    setShowDemoPrompt(false); // Hide demo prompt if open
    setShowClosingScreen(false); // Hide closing screen if open
    setIsStarted(false); // End the tour
    setCurrentStep(0); // Reset step
  };

  const handlePrevious = () => {
    // If showDemoPrompt is active, navigation buttons are hidden, so this special check isn't needed.
    // We only need to go back a step if possible.
    if (currentStep > 0) {
      setCalloutsVisible(false); // Hide callouts for transition
      setTimeout(() => {
        setCurrentStep(prev => prev - 1);
      }, 200);
    }
  };

  const handleClose = () => {
    setIsStarted(false);
    setCurrentStep(0);
    setShowDemoPrompt(false); // Ensure demo prompt is hidden on close
    setShowClosingScreen(false); // Ensure closing screen is hidden on close
  };

  const handleClosingContinue = () => {
    setShowClosingScreen(false); // Hide the closing screen
    setIsStarted(false); // Ensure tour is fully ended
    setCurrentStep(0); // Reset step
    // Optionally, redirect to a specific page on your site here
  };

  const progress = ((currentStep + 1) / TOUR_STEPS.length) * 100;

  // Closing screen - Renders if tour finished or user opted for it
  if (showClosingScreen) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-600 to-pink-500">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Thank you for taking the interactive tour!</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              If you want to learn more and interact with one of our engineers, 
              please book a demo to see how our platform can transform your DevOps workflows.
            </p>
            <div className="space-y-3">
              <Button
                onClick={handleScheduleDemo}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-xl"
              >
                Book Demo
              </Button>
              <Button
                variant="ghost"
                onClick={handleClosingContinue}
                className="w-full text-gray-500 hover:text-gray-700"
              >
                Continue to Site
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Welcome screen - Renders only if tour has not started and closing screen is not active
  if (!isStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-600 to-pink-500">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Play className="w-8 h-8 text-white ml-1" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to the Platform Tour</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Discover how our DevOps platform simplifies infrastructure management, 
              deployment, and monitoring with powerful visual tools and integrations.
            </p>
            <Button
              onClick={handleStart}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-xl"
            >
              Start Interactive Tour
            </Button>
            <Button
              variant="ghost"
              onClick={handleClose}
              className="w-full mt-3 text-gray-500 hover:text-gray-700"
            >
              Skip Tour
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  const currentStepData = TOUR_STEPS[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-600 to-pink-500">
      {/* Demo Prompt Modal */}
      <AnimatePresence>
        {showDemoPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full relative"
            >
              <button
                onClick={() => setShowDemoPrompt(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="w-6 h-6 text-white ml-1" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Want to see more?</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Keep going to see how our platform can give engineering teams more 
                  visibility into infrastructure deployment and monitoring workflows.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Or, schedule a demo with our team to see it live and get all of your 
                  questions answered.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  onClick={handleKeepGoing}
                  className="flex-1 border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 text-gray-700"
                >
                  Keep going
                </Button>
                <Button
                  onClick={handleScheduleDemo}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  Schedule demo
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tour Step */}
      <div className="relative w-full h-screen p-4 md:p-8 flex items-center justify-center">
        <div className="max-w-6xl w-full h-[calc(100vh-160px)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="relative w-full h-full bg-gray-100 rounded-xl overflow-hidden shadow-2xl"
            >
              {/* Screenshot */}
              <img
                src={currentStepData.image_url}
                alt={currentStepData.title}
                className="w-full h-full object-contain"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/10" />

              {/* Callouts */}
              {currentStepData.callouts?.map((callout, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: calloutsVisible ? 1 : 0, 
                    scale: calloutsVisible ? 1 : 0.8 
                  }}
                  transition={{ duration: 0.3, delay: callout.number * 0.1 }}
                  className="absolute z-20"
                  style={{
                    left: `${callout.x}%`,
                    top: `${callout.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <div className="relative">
                    <div className="w-8 h-8 bg-white rounded-full shadow-lg border-2 border-purple-500 flex items-center justify-center">
                      <span className="text-purple-600 font-bold text-sm">{callout.number}</span>
                    </div>
                    
                    <div className="absolute inset-0 w-8 h-8 bg-purple-500 rounded-full animate-ping opacity-20"></div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: callout.number * 0.1 + 0.2 }}
                      className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 p-4 z-30"
                    >
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-gray-100 rotate-45"></div>
                      <h4 className="font-semibold text-gray-900 mb-2">{callout.title}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{callout.description}</p>
                    </motion.div>
                  </div>
                </motion.div>
              ))}

              {/* Step info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg max-w-sm"
              >
                <h3 className="font-bold text-gray-900 mb-2">{currentStepData.title}</h3>
                <p className="text-sm text-gray-600">{currentStepData.description}</p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      {isStarted && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-t border-gray-200 p-6"
        >
          <div className="max-w-4xl mx-auto">
            {/* Progress bar */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Step {currentStep + 1} of {TOUR_STEPS.length}
                </span>
                <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                />
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0} 
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>

              <Button
                variant="ghost"
                onClick={handleClose}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
                Skip Tour
              </Button>

              <Button
                onClick={handleNext}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                {currentStep === TOUR_STEPS.length - 1 ? 'Finish Tour' : 'Next'}
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
