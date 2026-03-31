/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Camera, 
  ChevronLeft, 
  ChevronRight, 
  LayoutDashboard, 
  UtensilsCrossed, 
  BookOpen, 
  User, 
  MoreHorizontal,
  Plus,
  Flame,
  CheckCircle2,
  Calendar,
  ShoppingCart,
  TrendingUp,
  Droplets,
  RotateCcw,
  Search,
  ArrowRight,
  Info,
  CalendarDays,
  Clock,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { cn } from './lib/utils';

// --- Types ---

type Screen = 
  | 'welcome' 
  | 'onboarding-goals' 
  | 'onboarding-profile' 
  | 'dashboard' 
  | 'scanner' 
  | 'recommendations' 
  | 'planner' 
  | 'progress' 
  | 'grocery-list';

// --- Mock Data ---

const WEIGHT_DATA = [
  { date: 'Oct 1', weight: 186 },
  { date: 'Oct 8', weight: 182 },
  { date: 'Oct 15', weight: 184 },
  { date: 'Oct 22', weight: 178 },
  { date: 'Oct 29', weight: 176 },
];

const CALORIE_DATA = [
  { day: 'M', calories: 2650 },
  { day: 'T', calories: 2580 },
  { day: 'W', calories: 2780 },
  { day: 'T', calories: 2900 },
  { day: 'F', calories: 2700 },
  { day: 'S', calories: 2850 },
  { day: 'S', calories: 2650 },
];

const MACRO_DATA = [
  { name: 'Protein', value: 35, color: '#FFB088' },
  { name: 'Carbs', value: 40, color: '#A8E6CF' },
  { name: 'Fat', value: 25, color: '#FFD3B6' },
];

// --- Components ---

const BottomNav = ({ currentScreen, setScreen }: { currentScreen: Screen, setScreen: (s: Screen) => void }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'planner', label: 'Meals', icon: UtensilsCrossed },
    { id: 'recommendations', label: 'Recipes', icon: BookOpen },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'more', label: 'More', icon: MoreHorizontal },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center z-50">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentScreen === item.id || (item.id === 'planner' && currentScreen === 'planner');
        return (
          <button
            key={item.id}
            onClick={() => setScreen(item.id as Screen)}
            className={cn(
              "flex flex-col items-center gap-1 transition-colors",
              isActive ? "text-emerald-500" : "text-gray-400"
            )}
          >
            <Icon size={24} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

const ProgressRing = ({ value, max, label, unit, color, icon: Icon }: any) => {
  const percentage = Math.min(Math.round((value / max) * 100), 100);
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-20 h-20">
        <svg className="w-full h-full -rotate-90">
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth="6"
            className="text-gray-100"
          />
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-500 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xs font-bold leading-none">{value.toLocaleString()}</span>
          <span className="text-[8px] text-gray-400">/ {max}{unit}</span>
          <span className="text-[8px] text-gray-400 font-medium">{percentage}%</span>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <Icon size={12} className={cn("text-emerald-500")} style={{ color }} />
        <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">{label}</span>
      </div>
    </div>
  );
};

// --- Screens ---

const WelcomeScreen = ({ onNext }: { onNext: () => void }) => (
  <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8 text-center">
    <div className="mb-12 relative">
      <div className="w-48 h-48 bg-emerald-50 rounded-full flex items-center justify-center">
        <img 
          src="https://picsum.photos/seed/nutriai-logo/400/400" 
          alt="NutriAI Logo" 
          className="w-32 h-32 object-contain"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
    <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome to NutriAI</h1>
    <p className="text-gray-500 mb-12">Your personalized path to healthy eating</p>
    
    <div className="w-full max-w-xs space-y-4">
      <button 
        onClick={onNext}
        className="w-full bg-emerald-500 text-white py-4 rounded-full font-semibold flex items-center justify-center gap-3 hover:bg-emerald-600 transition-colors"
      >
        <span className="bg-white text-emerald-500 rounded-full p-0.5">
          <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
        </span>
        Continue with Google
      </button>
      <button 
        onClick={onNext}
        className="w-full bg-white border border-gray-200 text-gray-700 py-4 rounded-full font-semibold hover:bg-gray-50 transition-colors"
      >
        Continue with Email
      </button>
    </div>
    
    <p className="mt-auto text-[10px] text-gray-400 max-w-[200px]">
      By continuing, you agree to our <br />
      <span className="underline">Terms of Service</span> & <span className="underline">Privacy Policy</span>
    </p>
  </div>
);

const OnboardingGoalsScreen = ({ onNext, onBack }: { onNext: () => void, onBack: () => void }) => {
  const [selectedDiet, setSelectedDiet] = useState<string[]>(['Vegetarian', 'Vegan']);
  const [selectedGoals, setSelectedGoals] = useState<string[]>(['Weight Loss', 'Better Sleep']);

  const toggleDiet = (diet: string) => {
    setSelectedDiet(prev => prev.includes(diet) ? prev.filter(d => d !== diet) : [...prev, diet]);
  };

  const toggleGoal = (goal: string) => {
    setSelectedGoals(prev => prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]);
  };

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
          <ChevronLeft size={24} />
        </button>
        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="w-2/3 h-full bg-emerald-400" />
        </div>
      </div>
      
      <div className="text-center mb-8">
        <span className="text-xs font-medium text-gray-400">Step 2 of 3</span>
        <h2 className="text-3xl font-bold text-gray-900 mt-2">Onboarding: Goals & Diet</h2>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-bold mb-1">Dietary Preferences</h3>
          <p className="text-sm text-gray-400 mb-4">Select all that apply.</p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { id: 'Vegetarian', icon: '🌱' },
              { id: 'Non-Vegetarian', icon: '🍗' },
              { id: 'Vegan', icon: '🥦' },
              { id: 'Eggetarian', icon: '🥚' }
            ].map((diet) => (
              <button
                key={diet.id}
                onClick={() => toggleDiet(diet.id)}
                className={cn(
                  "p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all relative",
                  selectedDiet.includes(diet.id) 
                    ? "border-orange-200 bg-orange-50" 
                    : "border-gray-100 bg-white"
                )}
              >
                <span className="text-3xl">{diet.icon}</span>
                <span className="text-sm font-medium text-gray-700">{diet.id}</span>
                {selectedDiet.includes(diet.id) && (
                  <div className="absolute top-2 right-2 bg-orange-400 text-white rounded-full p-0.5">
                    <Check size={10} />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">Health Goals</h3>
          <div className="flex flex-wrap gap-3">
            {[
              'Weight Loss', 'Muscle Building', 'Diabetes Control', 
              'Better Sleep', 'Increased Energy'
            ].map((goal) => (
              <button
                key={goal}
                onClick={() => toggleGoal(goal)}
                className={cn(
                  "px-6 py-2.5 rounded-full border text-sm font-medium transition-all",
                  selectedGoals.includes(goal)
                    ? "border-orange-200 bg-orange-50 text-orange-600"
                    : "border-gray-200 text-gray-600"
                )}
              >
                {goal}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-auto pt-8">
        <button 
          onClick={onNext}
          className="w-full bg-orange-400 text-white py-4 rounded-full font-bold text-lg shadow-lg shadow-orange-100"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

const OnboardingProfileScreen = ({ onNext, onBack }: { onNext: () => void, onBack: () => void }) => {
  const [gender, setGender] = useState('Female');
  const [unit, setUnit] = useState({ height: 'CM', weight: 'KG' });

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
          <ChevronLeft size={24} />
        </button>
        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="w-1/2 h-full bg-emerald-400" />
        </div>
      </div>
      
      <div className="text-center mb-8">
        <span className="text-xs font-medium text-gray-400">Step 2 of 4: Personal Profile</span>
        <h2 className="text-3xl font-bold text-gray-900 mt-2">Personal Profile</h2>
        <p className="text-sm text-gray-400 mt-2">Help us customize your AI-powered plan.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-lg font-bold">Age</label>
          <div className="relative">
            <input 
              type="text" 
              placeholder="e.g., 30" 
              className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
            <CalendarDays className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-300" size={20} />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-lg font-bold">Gender</label>
          <div className="flex bg-gray-100 p-1 rounded-xl">
            {['Male', 'Female', 'Non-binary'].map((g) => (
              <button
                key={g}
                onClick={() => setGender(g)}
                className={cn(
                  "flex-1 py-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-1",
                  gender === g ? "bg-emerald-300 text-gray-900 shadow-sm" : "text-gray-500"
                )}
              >
                {g} {gender === g && <Check size={14} />}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-lg font-bold">Height</label>
            <div className="flex bg-gray-100 p-0.5 rounded-full text-[10px] font-bold">
              <button 
                onClick={() => setUnit({...unit, height: 'CM'})}
                className={cn("px-3 py-1 rounded-full", unit.height === 'CM' ? "bg-emerald-400 text-white" : "text-gray-400")}
              >CM</button>
              <button 
                onClick={() => setUnit({...unit, height: 'FT'})}
                className={cn("px-3 py-1 rounded-full", unit.height === 'FT' ? "bg-emerald-400 text-white" : "text-gray-400")}
              >FT</button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="cm" className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50/50" />
            <input type="text" placeholder="cm" className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50/50" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-lg font-bold">Weight</label>
            <div className="flex bg-gray-100 p-0.5 rounded-full text-[10px] font-bold">
              <button 
                onClick={() => setUnit({...unit, weight: 'KG'})}
                className={cn("px-3 py-1 rounded-full", unit.weight === 'KG' ? "bg-emerald-400 text-white" : "text-gray-400")}
              >KG</button>
              <button 
                onClick={() => setUnit({...unit, weight: 'LB'})}
                className={cn("px-3 py-1 rounded-full", unit.weight === 'LB' ? "bg-emerald-400 text-white" : "text-gray-400")}
              >LB</button>
            </div>
          </div>
          <input type="text" placeholder="kg" className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50/50" />
        </div>
      </div>

      <div className="mt-auto pt-8 flex flex-col items-center gap-4">
        <button 
          onClick={onNext}
          className="w-full bg-emerald-500 text-white py-4 rounded-full font-bold text-lg shadow-lg shadow-emerald-100"
        >
          Next
        </button>
        <button className="text-xs text-gray-400 underline">Why we ask for this?</button>
      </div>
    </div>
  );
};

const DashboardScreen = ({ setScreen }: { setScreen: (s: Screen) => void }) => (
  <div className="min-h-screen bg-emerald-50/30 pb-24">
    <div className="p-6 pt-12">
      <div className="flex justify-between items-start mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Good morning, Alex!</h1>
        <div className="w-10 h-10 rounded-full bg-white p-0.5 shadow-sm">
          <img src="https://picsum.photos/seed/alex-profile/100/100" alt="Profile" className="w-full h-full rounded-full object-cover" referrerPolicy="no-referrer" />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 mb-8">
        <ProgressRing value={1250} max={2000} unit=" kcal" label="Calories" color="#F97316" icon={Flame} />
        <ProgressRing value={85} max={140} unit="g" label="Protein" color="#10B981" icon={TrendingUp} />
        <ProgressRing value={110} max={220} unit="g" label="Carbs" color="#F59E0B" icon={UtensilsCrossed} />
        <ProgressRing value={30} max={65} unit="g" label="Fat" color="#059669" icon={Droplets} />
      </div>

      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Daily Meal Plan</h2>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {[
            { title: 'Breakfast', name: 'Oatmeal with Berries', kcal: 350, img: 'https://picsum.photos/seed/oatmeal/300/200', checked: true },
            { title: 'Lunch', name: 'Grilled Chicken Salad', kcal: 550, img: 'https://picsum.photos/seed/salad/300/200', checked: false },
            { title: 'Dinner', name: 'Salmon with Asparagus', kcal: 600, img: 'https://picsum.photos/seed/salmon/300/200', checked: false }
          ].map((meal, i) => (
            <div key={i} className="min-w-[160px] bg-white rounded-3xl p-4 shadow-sm border border-gray-50 relative">
              <span className="text-xs font-bold text-gray-900 block mb-2">{meal.title}</span>
              <img src={meal.img} alt={meal.name} className="w-full h-24 object-cover rounded-2xl mb-3" referrerPolicy="no-referrer" />
              <h3 className="text-sm font-bold text-gray-900 leading-tight mb-1">{meal.name}</h3>
              <span className="text-xs text-gray-400">{meal.kcal} kcal</span>
              {meal.checked && (
                <div className="absolute bottom-4 right-4 bg-orange-400 text-white rounded-full p-0.5">
                  <Check size={10} />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-50 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-500">
              <Droplets size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold">Water Intake</h3>
              <p className="text-xs text-gray-400">5 / 8 glasses</p>
            </div>
          </div>
          <button className="w-10 h-10 bg-emerald-500 text-white rounded-xl flex items-center justify-center shadow-lg shadow-emerald-100">
            <Plus size={24} />
          </button>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="w-[62.5%] h-full bg-emerald-400" />
        </div>
      </div>

      <section>
        <h2 className="text-xl font-bold mb-4">Recommended for You</h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            { type: 'High-Protein Snack', name: 'Greek Yogurt & Nuts', kcal: 180, img: 'https://picsum.photos/seed/yogurt/400/400' },
            { type: 'Hydrating Smoothie', name: 'Green Citrus Blend', kcal: 120, img: 'https://picsum.photos/seed/smoothie/400/400' }
          ].map((rec, i) => (
            <div key={i} className="relative h-48 rounded-3xl overflow-hidden group">
              <img src={rec.img} alt={rec.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 flex flex-col justify-end">
                <span className="text-[10px] font-bold text-white/80 uppercase tracking-wider mb-1">{rec.type}</span>
                <h3 className="text-sm font-bold text-white mb-1">{rec.name}</h3>
                <span className="text-[10px] text-white/60">{rec.kcal} kcal</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
    
    {/* Floating Action Button */}
    <button 
      onClick={() => setScreen('scanner')}
      className="fixed bottom-24 right-6 w-14 h-14 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-xl shadow-emerald-200 z-40 border-4 border-white"
    >
      <Camera size={28} />
    </button>

    <BottomNav currentScreen="dashboard" setScreen={setScreen} />
  </div>
);

const ScannerScreen = ({ setScreen }: { setScreen: (s: Screen) => void }) => {
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsScanning(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Camera Background */}
      <img 
        src="https://picsum.photos/seed/chicken-salad-scan/1080/1920" 
        alt="Camera View" 
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        referrerPolicy="no-referrer"
      />

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-6 pt-12 flex justify-between items-center z-10">
        <button onClick={() => setScreen('dashboard')} className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-white">AI Food Scanner</h1>
        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white">
          <User size={24} />
        </div>
      </div>

      {/* Scanning Frame */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="relative w-72 h-72">
          {/* Corners */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-orange-400 rounded-tl-3xl" />
          <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-orange-400 rounded-tr-3xl" />
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-orange-400 rounded-bl-3xl" />
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-orange-400 rounded-br-3xl" />
          
          {/* Scanning Line */}
          {isScanning && (
            <motion.div 
              initial={{ top: '0%' }}
              animate={{ top: '100%' }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_15px_rgba(255,255,255,0.8)]"
            />
          )}
        </div>
        <p className="text-white font-medium mt-8 tracking-widest uppercase text-sm">
          {isScanning ? 'Scanning...' : 'Analysis Complete'}
        </p>
      </div>

      {/* Analysis Card */}
      <AnimatePresence>
        {!isScanning && (
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[40px] p-8 pb-12 z-20"
          >
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />
            
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">AI Analysis</h2>
                <div className="flex items-center gap-2 text-gray-600 font-medium mb-1">
                  <Flame size={18} className="text-orange-500" />
                  <span>Estimated Calories:</span>
                </div>
                <div className="text-5xl font-black text-orange-400">320 kcal</div>
              </div>
              
              <div className="relative w-28 h-28">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={MACRO_DATA}
                      innerRadius={35}
                      outerRadius={45}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {MACRO_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-[8px] font-bold text-gray-400">
                  <span>MACROS</span>
                </div>
                {/* Labels around pie */}
                <div className="absolute -right-4 top-0 text-[10px]"><span className="font-bold">Carbs</span><br/>40%</div>
                <div className="absolute -left-4 top-0 text-[10px] text-right"><span className="font-bold">Protein</span><br/>35%</div>
                <div className="absolute -right-2 bottom-0 text-[10px]"><span className="font-bold">Fat</span><br/>25%</div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold">Healthy Alternatives</h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { name: 'Quinoa Salad', kcal: 320, img: 'https://picsum.photos/seed/qsalad/100/100' },
                  { name: 'Grilled Salmon', kcal: 320, img: 'https://picsum.photos/seed/gsalmon/100/100' },
                  { name: 'Veggie Stir-Fry', kcal: 300, img: 'https://picsum.photos/seed/vstir/100/100' }
                ].map((alt, i) => (
                  <div key={i} className="bg-emerald-50/50 rounded-2xl p-2 flex items-center gap-2 border border-emerald-100">
                    <img src={alt.img} alt={alt.name} className="w-10 h-10 rounded-xl object-cover" referrerPolicy="no-referrer" />
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold truncate">{alt.name}</p>
                      <p className="text-[8px] text-gray-400">{alt.kcal} kcal</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <button 
                onClick={() => setScreen('dashboard')}
                className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-xl shadow-emerald-100 border-4 border-emerald-50"
              >
                <Camera size={32} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const RecommendationsScreen = ({ setScreen }: { setScreen: (s: Screen) => void }) => (
  <div className="min-h-screen bg-gray-50 pb-24">
    <div className="bg-emerald-400 p-6 pt-12 rounded-b-[40px] shadow-lg shadow-emerald-100 mb-6">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => setScreen('dashboard')} className="p-2 bg-white/20 rounded-full text-white">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-white">Smart Recommendations</h1>
      </div>
      
      <div className="flex gap-3 overflow-x-auto no-scrollbar">
        {[
          { label: 'Veg', icon: '🌱' },
          { label: 'High Protein', icon: '💪', active: true },
          { label: 'Low Carb', icon: '🥗' }
        ].map((filter, i) => (
          <button
            key={i}
            className={cn(
              "px-6 py-2.5 rounded-full flex items-center gap-2 text-sm font-bold whitespace-nowrap transition-all",
              filter.active ? "bg-orange-400 text-white" : "bg-white text-gray-600"
            )}
          >
            <span>{filter.icon}</span>
            {filter.label}
          </button>
        ))}
      </div>
    </div>

    <div className="px-6 space-y-6">
      {[
        { name: 'Grilled Chicken & Quinoa Salad', kcal: 380, protein: 32, score: 95, img: 'https://picsum.photos/seed/chicken-salad/400/300' },
        { name: 'Baked Salmon & Asparagus', kcal: 420, protein: 35, score: 92, img: 'https://picsum.photos/seed/salmon-asp/400/300' },
        { name: 'Lentil & Veggie Stew', kcal: 310, protein: 18, score: 95, img: 'https://picsum.photos/seed/stew/400/300' }
      ].map((meal, i) => (
        <div key={i} className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-50 flex">
          <div className="w-1/3 p-3">
            <img src={meal.img} alt={meal.name} className="w-full h-full object-cover rounded-2xl" referrerPolicy="no-referrer" />
          </div>
          <div className="flex-1 p-5 pl-2">
            <div className="flex items-center gap-1 text-emerald-500 mb-1">
              <CheckCircle2 size={14} />
              <span className="text-xs font-bold">{meal.score}/100</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2">{meal.name}</h3>
            <p className="text-sm text-gray-400 mb-4">{meal.kcal} kcal | {meal.protein}g Protein</p>
            <button className="w-full bg-orange-100 text-orange-500 py-2.5 rounded-xl font-bold text-sm hover:bg-orange-200 transition-colors">
              Quick Recipe
            </button>
          </div>
        </div>
      ))}
    </div>

    <BottomNav currentScreen="recommendations" setScreen={setScreen} />
  </div>
);

const PlannerScreen = ({ setScreen }: { setScreen: (s: Screen) => void }) => (
  <div className="min-h-screen bg-gray-50 pb-24">
    <div className="p-6 pt-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-500">
          <Calendar size={24} />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Weekly Diet Planner</h1>
      </div>

      <div className="flex justify-between mb-8">
        {[
          { day: 'Mon', date: 23, active: true },
          { day: 'Tue', date: 24 },
          { day: 'Wed', date: 25 },
          { day: 'Thu', date: 26 },
          { day: 'Fri', date: 27 },
          { day: 'Sat', date: 28 },
          { day: 'Sun', date: 29 }
        ].map((d, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <span className="text-xs font-medium text-gray-400">{d.day}</span>
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold",
              d.active ? "bg-emerald-500 text-white shadow-lg shadow-emerald-100" : "text-gray-500"
            )}>
              {d.date}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mb-6">
        <p className="text-sm font-bold text-gray-900">Today's Progress: <span className="text-emerald-500">2/4 Meals Completed</span></p>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-500">
            <Check size={14} />
          </div>
          <ArrowRight size={18} className="text-orange-400" />
        </div>
      </div>
      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden mb-8">
        <div className="w-1/2 h-full bg-emerald-400" />
      </div>

      <div className="space-y-4">
        {[
          { type: 'Breakfast', name: 'Avocado Toast with Eggs', kcal: 350, protein: 15, img: 'https://picsum.photos/seed/avotoast/200/200', checked: true, icon: '☀️' },
          { type: 'Lunch', name: 'Quinoa Salad with Grilled Chicken', kcal: 450, protein: 25, img: 'https://picsum.photos/seed/qsalad2/200/200', checked: true, icon: '🍲' },
          { type: 'Snack', name: 'Greek Yogurt with Berries', kcal: 150, protein: 8, img: 'https://picsum.photos/seed/yogurt2/200/200', checked: false, icon: '🍎' },
          { type: 'Dinner', name: 'Baked Salmon with Roasted Veggies', kcal: 550, protein: 30, img: 'https://picsum.photos/seed/salmon2/200/200', checked: false, icon: '🌙' }
        ].map((meal, i) => (
          <div key={i} className="bg-white rounded-3xl p-4 shadow-sm border border-gray-50 flex items-center gap-4">
            <img src={meal.img} alt={meal.name} className="w-20 h-20 rounded-2xl object-cover" referrerPolicy="no-referrer" />
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-1">
                  <span className="text-sm">{meal.icon}</span>
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">{meal.type}</span>
                </div>
                <button className="flex items-center gap-1 text-orange-400 text-xs font-bold">
                  <RotateCcw size={12} />
                  Swap
                </button>
              </div>
              <h3 className="text-sm font-bold text-gray-900 mb-1">{meal.name}</h3>
              <p className="text-xs text-gray-400">{meal.kcal} kcal • {meal.protein}g Protein</p>
            </div>
            <div className={cn(
              "w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors",
              meal.checked ? "bg-emerald-500 border-emerald-500 text-white" : "border-gray-200"
            )}>
              {meal.checked && <Check size={14} />}
            </div>
          </div>
        ))}
      </div>
      
      <button 
        onClick={() => setScreen('grocery-list')}
        className="mt-8 w-full bg-emerald-50 text-emerald-500 py-4 rounded-2xl font-bold flex items-center justify-center gap-2"
      >
        <ShoppingCart size={20} />
        View Grocery List
      </button>
    </div>

    <BottomNav currentScreen="planner" setScreen={setScreen} />
  </div>
);

const ProgressScreen = ({ setScreen }: { setScreen: (s: Screen) => void }) => (
  <div className="min-h-screen bg-gray-50 pb-24">
    <div className="p-6 pt-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => setScreen('dashboard')} className="p-2 bg-white rounded-full shadow-sm">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Health Progress Tracking</h1>
        </div>
        <div className="w-10 h-10 rounded-full bg-white p-0.5 shadow-sm">
          <img src="https://picsum.photos/seed/alex-profile/100/100" alt="Profile" className="w-full h-full rounded-full object-cover" referrerPolicy="no-referrer" />
        </div>
      </div>

      <div className="bg-white rounded-[40px] p-6 shadow-sm border border-gray-50 mb-6">
        <div className="mb-6">
          <h3 className="text-lg font-bold">Weight Changes</h3>
          <p className="text-xs text-gray-400">Last 30 Days</p>
        </div>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={WEIGHT_DATA}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#9CA3AF' }} 
                dy={10}
              />
              <YAxis 
                domain={[170, 195]} 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#9CA3AF' }}
                ticks={[170, 180, 190]}
              />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="weight" 
                stroke="#10B981" 
                strokeWidth={3} 
                dot={{ r: 4, fill: '#10B981', strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-[40px] p-6 shadow-sm border border-gray-50 mb-6">
        <div className="mb-6">
          <h3 className="text-lg font-bold">Daily Calorie Intake</h3>
          <p className="text-xs text-gray-400">Last 7 Days</p>
        </div>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={CALORIE_DATA}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#9CA3AF' }} 
                dy={10}
              />
              <YAxis 
                domain={[0, 3000]} 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#9CA3AF' }}
                ticks={[2000, 2500, 3000]}
              />
              <Tooltip />
              <Bar dataKey="calories" radius={[6, 6, 0, 0]}>
                {CALORIE_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 3 ? '#F97316' : '#FFB088'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-emerald-50 rounded-[32px] p-5 border border-emerald-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-emerald-500">
              <UtensilsCrossed size={16} />
            </div>
            <span className="text-xs font-bold text-gray-700">Avg Protein</span>
          </div>
          <div className="text-4xl font-black text-emerald-500 mb-1">85g</div>
          <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600">
            <TrendingUp size={12} />
            +5g from last week
          </div>
        </div>

        <div className="bg-orange-50 rounded-[32px] p-5 border border-orange-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-orange-500">
              <Droplets size={16} />
            </div>
            <span className="text-xs font-bold text-gray-700">Water Goal Reached</span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <div className="text-4xl font-black text-orange-400 mb-1">92%</div>
              <p className="text-[10px] text-gray-500 font-medium">2.7L / 3L Goal</p>
            </div>
            <div className="relative w-12 h-12">
              <svg className="w-full h-full -rotate-90">
                <circle cx="24" cy="24" r="20" fill="transparent" stroke="#FEE2E2" strokeWidth="4" />
                <circle cx="24" cy="24" r="20" fill="transparent" stroke="#F97316" strokeWidth="4" strokeDasharray={125.6} strokeDashoffset={125.6 * (1 - 0.92)} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-[8px] font-bold">92%</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <BottomNav currentScreen="progress" setScreen={setScreen} />
  </div>
);

const GroceryListScreen = ({ setScreen }: { setScreen: (s: Screen) => void }) => {
  const [checkedItems, setCheckedItems] = useState<string[]>(['Organic Chicken Breast', 'Salmon Fillets']);

  const toggleItem = (item: string) => {
    setCheckedItems(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  const categories = [
    {
      name: 'Produce',
      items: [
        { name: 'Avocados', qty: '3 units' },
        { name: 'Spinach', qty: '1 bag (300g)' },
        { name: 'Blueberries', qty: '2 pints' },
        { name: 'Sweet Potatoes', qty: '1 kg' }
      ]
    },
    {
      name: 'Proteins',
      items: [
        { name: 'Organic Chicken Breast', qty: '1.5 lbs' },
        { name: 'Salmon Fillets', qty: '2 packs' },
        { name: 'Eggs (Free Range)', qty: '1 dozen' }
      ]
    },
    {
      name: 'Pantry',
      items: [
        { name: 'Quinoa', qty: '1 bag (500g)' },
        { name: 'Olive Oil (Extra Virgin)', qty: '1 bottle (500ml)' },
        { name: 'Almonds (Raw)', qty: '1 pack (250g)' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="p-6 pt-12">
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => setScreen('planner')} className="p-2 hover:bg-gray-100 rounded-full">
            <ChevronLeft size={24} />
          </button>
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <User size={24} />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-2">Smart Grocery List</h1>
        <p className="text-gray-400 mb-8">Generated from your Weekly Plan</p>

        <div className="space-y-8">
          {categories.map((cat, i) => (
            <div key={i}>
              <h2 className="text-2xl font-bold text-emerald-400 mb-4">{cat.name}</h2>
              <div className="bg-gray-50/50 rounded-[32px] border border-gray-100 divide-y divide-gray-100">
                {cat.items.map((item, j) => (
                  <button
                    key={j}
                    onClick={() => toggleItem(item.name)}
                    className="w-full p-4 flex items-center gap-4 text-left"
                  >
                    <div className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors",
                      checkedItems.includes(item.name) ? "bg-emerald-500 border-emerald-500 text-white" : "border-gray-200"
                    )}>
                      {checkedItems.includes(item.name) && <Check size={14} />}
                    </div>
                    <div>
                      <p className={cn("font-bold", checkedItems.includes(item.name) ? "text-gray-400 line-through" : "text-gray-900")}>
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-400">{item.qty}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-10 left-0 right-0 px-6 flex justify-end pointer-events-none">
        <button className="bg-emerald-400 text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 shadow-xl shadow-emerald-100 pointer-events-auto">
          <ShoppingCart size={20} />
          Shop Now
        </button>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [screen, setScreen] = useState<Screen>('welcome');

  const renderScreen = () => {
    switch (screen) {
      case 'welcome':
        return <WelcomeScreen onNext={() => setScreen('onboarding-goals')} />;
      case 'onboarding-goals':
        return <OnboardingGoalsScreen onNext={() => setScreen('onboarding-profile')} onBack={() => setScreen('welcome')} />;
      case 'onboarding-profile':
        return <OnboardingProfileScreen onNext={() => setScreen('dashboard')} onBack={() => setScreen('onboarding-goals')} />;
      case 'dashboard':
        return <DashboardScreen setScreen={setScreen} />;
      case 'scanner':
        return <ScannerScreen setScreen={setScreen} />;
      case 'recommendations':
        return <RecommendationsScreen setScreen={setScreen} />;
      case 'planner':
        return <PlannerScreen setScreen={setScreen} />;
      case 'progress':
        return <ProgressScreen setScreen={setScreen} />;
      case 'grocery-list':
        return <GroceryListScreen setScreen={setScreen} />;
      default:
        return <DashboardScreen setScreen={setScreen} />;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen relative shadow-2xl overflow-hidden font-sans">
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="min-h-screen"
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
