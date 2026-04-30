import { useState, useEffect } from 'react';
import { getJoints, getMovementsForJoint, stretchData, BodyPartData } from './data';
import { SkeletonView } from './components/SkeletonView';
import { ContentPanel } from './components/ContentPanel';
import { Login } from './components/Login';
import { Activity, MousePointer2, LogOut } from 'lucide-react';
import { auth } from './firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';

function App() {
  const [selectedJointId, setSelectedJointId] = useState<string | null>(null);
  const [selectedMovement, setSelectedMovement] = useState<BodyPartData | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth);
  };

  const handleJointSelect = (jointId: string) => {
    setSelectedJointId(jointId);
    // Automatically select the first movement of the joint
    const movements = getMovementsForJoint(jointId);
    if (movements.length > 0) {
      setSelectedMovement(movements[0]);
    } else {
      setSelectedMovement(null);
    }
  };

  const availableMovements = selectedJointId ? getMovementsForJoint(selectedJointId) : [];

  if (loadingAuth) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-teal-200 pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-teal-100 p-2 rounded-lg">
              <Activity className="w-6 h-6 text-teal-600" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-700">Anatomy Stretch PRO</h1>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg"
          >
            <LogOut size={16} />
            ログアウト
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Skeleton & Movement Selector */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {/* Skeleton */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center">
              <h2 className="text-sm font-bold mb-4 text-slate-500 w-full text-center tracking-wider">
                1. 骨格から関節・部位を選択
              </h2>
              <div className="relative w-full max-w-[240px] aspect-[1/1.8] bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden flex items-center justify-center">
                <SkeletonView 
                  selectedId={selectedJointId} 
                  onSelect={handleJointSelect} 
                />
              </div>
            </div>

            {/* Movement Selector */}
            {selectedJointId && availableMovements.length > 0 && (
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 animate-in fade-in slide-in-from-top-4">
                <h2 className="text-sm font-bold mb-4 text-slate-500 tracking-wider">
                  2. 動作を選択 ({availableMovements[0]?.jointName})
                </h2>
                <div className="flex flex-col gap-2">
                  {availableMovements.map((movement) => (
                    <button
                      key={movement.id}
                      onClick={() => setSelectedMovement(movement)}
                      className={`text-left px-5 py-4 rounded-2xl text-sm font-bold transition-all
                        ${selectedMovement?.id === movement.id
                          ? 'bg-teal-500 text-white shadow-md shadow-teal-200 translate-x-1'
                          : 'bg-slate-50 text-slate-600 hover:bg-teal-50 hover:text-teal-700 border border-slate-100 hover:translate-x-1'
                        }`}
                    >
                      {movement.movement}
                      <span className="block text-xs font-normal opacity-80 mt-1">
                        筋: {movement.targetMuscles.join(', ')}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Content Panel */}
          <div className="lg:col-span-8">
            {selectedMovement ? (
              <ContentPanel data={selectedMovement} />
            ) : (
              <div className="bg-white p-12 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center justify-center h-full min-h-[500px] text-slate-400">
                <div className="bg-slate-50 p-6 rounded-full mb-6">
                  <MousePointer2 className="w-12 h-12 text-slate-300" />
                </div>
                <p className="text-lg font-medium text-slate-500">左の骨格図から関節をクリックし、動作を選択してください</p>
                <p className="text-sm text-slate-400 mt-2">部位ごとに解剖学、ROM基準、セルフ/パートナーストレッチが確認できます</p>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;
