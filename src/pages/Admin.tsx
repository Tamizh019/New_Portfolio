import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Save, RotateCcw, Copy, Check, Plus, Trash2, ArrowLeft, 
    Layers, Settings, Eye, Globe, Github, Info, ListTodo, Wrench,
    ChevronUp, ChevronDown, User, Mail, Compass, Heart, Users
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getLocalPortfolioData, saveLocalPortfolioData, resetLocalPortfolioData } from '../services/portfolio';
import { UserData, Project } from '../../types';

export default function Admin() {
    const [data, setData] = useState<UserData>(() => getLocalPortfolioData());
    const [activeTab, setActiveTab] = useState<'projects' | 'profile'>('projects');
    const [activeProjectIdx, setActiveProjectIdx] = useState(0);
    const [copied, setCopied] = useState(false);
    const [showExportModal, setShowExportModal] = useState(false);
    
    // Auth and Save Sync States
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        if (typeof window !== 'undefined') {
            return !!sessionStorage.getItem('admin_password');
        }
        return false;
    });
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [syncMessage, setSyncMessage] = useState('');

    // Temporary states for additions
    const [newScreenshot, setNewScreenshot] = useState('');
    const [newTech, setNewTech] = useState('');
    const [newFeature, setNewFeature] = useState('');
    const [newTeamName, setNewTeamName] = useState('');
    const [newTeamRole, setNewTeamRole] = useState('');
    const [newInterest, setNewInterest] = useState('');
    const [newHobby, setNewHobby] = useState('');

    const activeProject = data.projects[activeProjectIdx] || null;

    // Login Form Handler
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!password.trim()) return;
        
        setIsLoggingIn(true);
        setLoginError('');
        
        try {
            const response = await fetch('/.netlify/functions/verify-admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-admin-password': password.trim()
                }
            });
            
            if (response.ok) {
                sessionStorage.setItem('admin_password', password.trim());
                setIsAuthenticated(true);
            } else {
                const errData = await response.json().catch(() => ({}));
                setLoginError(errData.error || 'Invalid passcode. Please try again.');
            }
        } catch (err) {
            console.error("Local check failed", err);
            setLoginError('Could not reach serverless authentication function. Local offline dev server check failed.');
        } finally {
            setIsLoggingIn(false);
        }
    };

    // Update helpers
    const updateProjectField = (field: keyof Project, value: any) => {
        if (activeProjectIdx < 0 || activeProjectIdx >= data.projects.length) return;
        const updatedProjects = [...data.projects];
        updatedProjects[activeProjectIdx] = {
            ...updatedProjects[activeProjectIdx],
            [field]: value
        };
        setData({
            ...data,
            projects: updatedProjects
        });
    };

    const updateProjectLinks = (linkKey: 'github' | 'demo' | 'hf', value: string) => {
        if (activeProjectIdx < 0 || activeProjectIdx >= data.projects.length) return;
        const updatedProjects = [...data.projects];
        const currentLinks = updatedProjects[activeProjectIdx].links || {};
        updatedProjects[activeProjectIdx] = {
            ...updatedProjects[activeProjectIdx],
            links: {
                ...currentLinks,
                [linkKey]: value
            }
        };
        setData({
            ...data,
            projects: updatedProjects
        });
    };

    const updateProfileField = (field: keyof UserData, value: any) => {
        setData({
            ...data,
            [field]: value
        });
    };

    // Project List Management
    const handleCreateProject = () => {
        const newProj: Project = {
            title: "New Project Title",
            description: "A short elegant pitch about your new project.",
            techStack: ["React", "TypeScript", "Vite"],
            features: [
                "Real-time reactive state synchronization",
                "Fully responsive layout optimized for mobile screens"
            ],
            links: {
                github: "",
                demo: ""
            },
            isFeatured: false,
            screenshots: []
        };
        const updatedProjects = [...data.projects, newProj];
        setData({
            ...data,
            projects: updatedProjects
        });
        setActiveProjectIdx(updatedProjects.length - 1);
    };

    const handleDeleteProject = (indexToDelete: number) => {
        if (data.projects.length <= 1) {
            alert("You must keep at least one project in your portfolio.");
            return;
        }
        const title = data.projects[indexToDelete]?.title || "this project";
        if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
            const updatedProjects = data.projects.filter((_, idx) => idx !== indexToDelete);
            setData({
                ...data,
                projects: updatedProjects
            });
            setActiveProjectIdx(prev => {
                if (prev >= updatedProjects.length) {
                    return updatedProjects.length - 1;
                }
                return prev;
            });
        }
    };

    const handleMoveProject = (index: number, direction: 'up' | 'down') => {
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= data.projects.length) return;
        
        const updatedProjects = [...data.projects];
        const temp = updatedProjects[index];
        updatedProjects[index] = updatedProjects[targetIndex];
        updatedProjects[targetIndex] = temp;
        
        setData({
            ...data,
            projects: updatedProjects
        });
        setActiveProjectIdx(targetIndex);
    };

    // Screenshots handlers
    const handleAddScreenshot = () => {
        if (!newScreenshot.trim() || !activeProject) return;
        const currentScreens = activeProject.screenshots ? [...activeProject.screenshots] : [];
        updateProjectField('screenshots', [...currentScreens, newScreenshot.trim()]);
        setNewScreenshot('');
    };

    const handleDeleteScreenshot = (indexToDelete: number) => {
        if (!activeProject || !activeProject.screenshots) return;
        const updatedScreens = activeProject.screenshots.filter((_, idx) => idx !== indexToDelete);
        updateProjectField('screenshots', updatedScreens);
    };

    // Tech stack handlers
    const handleAddTech = () => {
        if (!newTech.trim() || !activeProject) return;
        const currentTech = activeProject.techStack ? [...activeProject.techStack] : [];
        if (!currentTech.includes(newTech.trim())) {
            updateProjectField('techStack', [...currentTech, newTech.trim()]);
        }
        setNewTech('');
    };

    const handleDeleteTech = (techToDelete: string) => {
        if (!activeProject) return;
        const updatedTech = activeProject.techStack.filter(t => t !== techToDelete);
        updateProjectField('techStack', updatedTech);
    };

    // Feature list handlers
    const handleAddFeature = () => {
        if (!newFeature.trim() || !activeProject) return;
        const currentFeatures = activeProject.features ? [...activeProject.features] : [];
        updateProjectField('features', [...currentFeatures, newFeature.trim()]);
        setNewFeature('');
    };

    const handleDeleteFeature = (idxToDelete: number) => {
        if (!activeProject) return;
        const updatedFeatures = activeProject.features.filter((_, idx) => idx !== idxToDelete);
        updateProjectField('features', updatedFeatures);
    };

    // Team members handlers
    const handleAddTeamMember = () => {
        if (!newTeamName.trim() || !activeProject) return;
        const currentTeam = activeProject.team ? [...activeProject.team] : [];
        const member = {
            name: newTeamName.trim(),
            ...(newTeamRole.trim() ? { role: newTeamRole.trim() } : {})
        };
        updateProjectField('team', [...currentTeam, member]);
        setNewTeamName('');
        setNewTeamRole('');
    };

    const handleDeleteTeamMember = (idxToDelete: number) => {
        if (!activeProject || !activeProject.team) return;
        const updatedTeam = activeProject.team.filter((_, idx) => idx !== idxToDelete);
        updateProjectField('team', updatedTeam.length > 0 ? updatedTeam : undefined);
    };

    // Profile Interests & Hobbies
    const handleAddInterest = () => {
        if (!newInterest.trim()) return;
        const current = data.interests ? [...data.interests] : [];
        if (!current.includes(newInterest.trim())) {
            updateProfileField('interests', [...current, newInterest.trim()]);
        }
        setNewInterest('');
    };

    const handleDeleteInterest = (itemToDelete: string) => {
        const current = data.interests ? [...data.interests] : [];
        updateProfileField('interests', current.filter(item => item !== itemToDelete));
    };

    const handleAddHobby = () => {
        if (!newHobby.trim()) return;
        const current = data.hobbies ? [...data.hobbies] : [];
        if (!current.includes(newHobby.trim())) {
            updateProfileField('hobbies', [...current, newHobby.trim()]);
        }
        setNewHobby('');
    };

    const handleDeleteHobby = (itemToDelete: string) => {
        const current = data.hobbies ? [...data.hobbies] : [];
        updateProfileField('hobbies', current.filter(item => item !== itemToDelete));
    };

    // Global actions (Save Changes)
    const handleSaveChanges = async () => {
        // Save to browser localStorage first
        saveLocalPortfolioData(data);
        
        const storedPassword = sessionStorage.getItem('admin_password');
        
        // If bypassed (offline mode), notify local storage only
        if (!storedPassword || storedPassword === 'offline_mode') {
            alert("Changes saved to browser LocalStorage! Pushes to GitHub are disabled in offline dev mode.");
            return;
        }

        setIsSaving(true);
        setSyncMessage('Syncing data to LocalStorage & pushing to GitHub repository...');

        try {
            const response = await fetch('/.netlify/functions/update-constants', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-admin-password': storedPassword
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert("Success! Changes successfully saved to LocalStorage and committed to GitHub.\n\nNetlify is now automatically rebuilding and deploying the live website. The new data will go live in about 1–2 minutes!");
            } else {
                const errData = await response.json().catch(() => ({}));
                alert(`Saved locally, but failed to sync to GitHub: ${errData.error || 'Server error'}.\n\nYour overrides are saved in this browser, but to push them live globally, copy-export the TS code manually.`);
            }
        } catch (err) {
            console.error("Serverless push failed", err);
            alert("Saved changes locally! However, could not connect to GitHub sync serverless function.\n\nMake sure serverless functions are configured correctly. In local development, ensure you run 'npx netlify dev'.");
        } finally {
            setIsSaving(false);
            setSyncMessage('');
        }
    };

    const handleResetDefaults = () => {
        if (window.confirm("Are you sure you want to reset all overrides? This deletes browser LocalStorage changes and restores static file defaults.")) {
            resetLocalPortfolioData();
            const original = getLocalPortfolioData();
            setData(original);
            setActiveProjectIdx(0);
            alert("Local changes discarded. Restored constants.ts defaults.");
        }
    };

    // Export code formatter
    const getExportCodeString = () => {
        const cleanJSON = JSON.stringify(data, null, 2);
        return `import { UserData } from './types';\n\nexport const PORTFOLIO_DATA: UserData = ${cleanJSON};\n`;
    };

    const handleCopyCode = () => {
        navigator.clipboard.writeText(getExportCodeString());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Render Login Gate if unauthenticated
    if (!isAuthenticated) {
        return (
            <section className="py-20 flex items-center justify-center min-h-[85vh] text-slate-350 dot-grid">
                <div className="max-w-md w-full mx-auto px-6">
                    <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-surface border border-border/80 rounded-2xl p-6 sm:p-8 shadow-[0_24px_50px_rgba(0,0,0,0.8)] backdrop-blur-md"
                    >
                        <div className="text-center mb-6">
                            <Settings className="text-accent mx-auto mb-3 animate-pulse-slow" size={32} />
                            <h2 className="text-2xl font-display font-bold text-white tracking-wide">
                                Admin Gate
                            </h2>
                            <p className="text-[10px] text-slate-500 mt-2 font-mono uppercase tracking-wider">
                                / Access Portfolio Database Configuration
                            </p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2">
                                    Admin Password
                                </label>
                                <input 
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-[#101018]/50 border border-border rounded-xl px-4 py-3 text-sm text-white focus:border-accent/40 outline-none transition-colors text-center tracking-widest font-mono"
                                    required
                                />
                            </div>

                            {loginError && (
                                <div className="p-3 bg-red-500/10 border border-red-500/25 rounded-xl text-xs text-red-400 text-center leading-relaxed">
                                    <p className="mb-1">{loginError}</p>
                                    {loginError.includes("offline") && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                sessionStorage.setItem('admin_password', 'offline_mode');
                                                setIsAuthenticated(true);
                                            }}
                                            className="inline-block mt-2 text-accent underline hover:text-white font-mono text-[9px] uppercase font-bold"
                                        >
                                            Bypass to Local Dev Mode
                                        </button>
                                    )}
                                </div>
                            )}

                            <button 
                                type="submit"
                                disabled={isLoggingIn}
                                className="w-full flex items-center justify-center gap-2 bg-accent hover:opacity-90 disabled:opacity-50 text-primary py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider font-mono transition-all"
                            >
                                {isLoggingIn ? 'Authenticating...' : 'Unlock Dashboard'}
                            </button>
                        </form>

                        <div className="mt-6 text-center border-t border-border/40 pt-4">
                            <Link to="/projects" className="text-xs text-slate-500 hover:text-accent font-mono transition-colors">
                                ← Return to Portfolio
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 relative flex-grow min-h-screen text-slate-350 dot-grid">
            <div className="max-w-6xl mx-auto px-6">
                
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-border/40 pb-6 mb-8">
                    <div>
                        <Link to="/projects" className="inline-flex items-center gap-2 text-slate-500 hover:text-accent font-mono text-xs mb-3 transition-colors group">
                            <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" /> BACK TO PORTFOLIO
                        </Link>
                        <h1 className="text-3xl font-display font-bold text-white flex items-center gap-3">
                            <Settings className="text-accent2 animate-pulse-slow" size={24} /> 
                            Portfolio Admin <span className="text-accent font-light">Panel</span>
                        </h1>
                        <p className="text-xs text-slate-500 mt-2 font-mono uppercase tracking-wider">
                            / Customize Projects, Screenshots, and Meta information dynamically
                        </p>
                    </div>

                    {/* Global Buttons */}
                    <div className="flex flex-wrap gap-3">
                        <button 
                            onClick={handleResetDefaults}
                            disabled={isSaving}
                            className="flex items-center gap-2 bg-[#151522]/30 hover:bg-[#151522]/80 border border-border/70 text-slate-400 hover:text-white px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider font-mono transition-all disabled:opacity-50"
                            title="Restore default database layout"
                        >
                            <RotateCcw size={14} /> Reset Defaults
                        </button>
                        
                        <button 
                            onClick={() => setShowExportModal(true)}
                            disabled={isSaving}
                            className="flex items-center gap-2 bg-accent2/10 hover:bg-accent2/20 border border-accent2/25 text-accent2 px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider font-mono transition-all disabled:opacity-50"
                            title="Generate and copy code block for constants.ts"
                        >
                            <Copy size={14} /> Export Code
                        </button>

                        <button 
                            onClick={handleSaveChanges}
                            disabled={isSaving}
                            className="flex items-center gap-2 bg-accent hover:opacity-90 disabled:opacity-50 text-primary px-5 py-2.5 rounded-lg text-xs font-extrabold uppercase tracking-wider font-mono transition-all shadow-md shadow-accent/5"
                            title="Commit overrides to browser local storage and GitHub"
                        >
                            {isSaving ? (
                                <>
                                    <span className="w-3.5 h-3.5 border-2 border-primary border-t-transparent rounded-full animate-spin shrink-0"></span>
                                    Syncing Repo...
                                </>
                            ) : (
                                <>
                                    <Save size={14} /> Save Changes
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Sync status alert banner */}
                {syncMessage && (
                    <div className="mb-6 p-4 bg-accent/10 border border-accent/20 rounded-xl text-accent font-mono text-xs flex items-center gap-3 animate-pulse">
                        <span className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin shrink-0"></span>
                        {syncMessage}
                    </div>
                )}

                {/* Tab Switcher */}
                <div className="flex gap-6 border-b border-border/20 pb-4 mb-8">
                    <button
                        onClick={() => setActiveTab('projects')}
                        className={`pb-2 px-1 text-sm font-mono tracking-wider transition-all border-b-2 outline-none ${
                            activeTab === 'projects'
                                ? 'text-accent border-accent font-semibold'
                                : 'text-slate-500 border-transparent hover:text-slate-350'
                        }`}
                    >
                        PROJECTS LIST MANAGER
                    </button>
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`pb-2 px-1 text-sm font-mono tracking-wider transition-all border-b-2 outline-none ${
                            activeTab === 'profile'
                                ? 'text-accent border-accent font-semibold'
                                : 'text-slate-500 border-transparent hover:text-slate-350'
                        }`}
                    >
                        PROFILE & METADATA
                    </button>
                </div>

                {/* Main Content Layout */}
                <AnimatePresence mode="wait">
                    {activeTab === 'projects' ? (
                        <motion.div 
                            key="projects-tab"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="grid lg:grid-cols-4 gap-8"
                        >
                            {/* Left Sidebar: Projects List */}
                            <div className="lg:col-span-1 space-y-3">
                                <div className="flex items-center justify-between px-3">
                                    <h3 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                        <Layers size={11} /> Projects catalog ({data.projects.length})
                                    </h3>
                                    <button
                                        onClick={handleCreateProject}
                                        className="p-1 bg-accent/5 hover:bg-accent/15 text-accent hover:text-white border border-accent/20 rounded-md transition-all flex items-center justify-center"
                                        title="Create New Project"
                                    >
                                        <Plus size={13} />
                                    </button>
                                </div>
                                
                                <div className="space-y-2">
                                    {data.projects.map((project, idx) => {
                                        const isActive = activeProjectIdx === idx;
                                        return (
                                            <div
                                                key={idx}
                                                onClick={() => setActiveProjectIdx(idx)}
                                                className={`w-full text-left p-3 rounded-xl border transition-all duration-200 flex items-center justify-between group cursor-pointer ${
                                                    isActive 
                                                        ? 'bg-[#151522]/50 border-accent/30 text-white font-medium pl-4 shadow-sm' 
                                                        : 'bg-surface/20 border-border/40 hover:bg-surface/40 hover:border-border/80 text-slate-400 hover:text-white'
                                                }`}
                                            >
                                                <div className="truncate flex-1">
                                                    <div className="text-[8px] font-mono text-slate-550 group-hover:text-accent/60 mb-0.5 uppercase">
                                                        INDEX {String(idx + 1).padStart(2, '0')} {project.isFeatured && '• FEATURED'}
                                                    </div>
                                                    <div className="text-sm font-display truncate pr-2">{project.title}</div>
                                                </div>
                                                
                                                <div className="flex items-center gap-1">
                                                    {/* Move Up/Down Controls */}
                                                    <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity bg-surface/80 rounded border border-border/50 p-0.5">
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleMoveProject(idx, 'up');
                                                            }}
                                                            disabled={idx === 0}
                                                            className="p-0.5 hover:bg-white/5 hover:text-accent text-slate-500 disabled:opacity-10 transition-colors"
                                                            title="Move Up"
                                                        >
                                                            <ChevronUp size={11} />
                                                        </button>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleMoveProject(idx, 'down');
                                                            }}
                                                            disabled={idx === data.projects.length - 1}
                                                            className="p-0.5 hover:bg-white/5 hover:text-accent text-slate-500 disabled:opacity-10 transition-colors"
                                                            title="Move Down"
                                                        >
                                                            <ChevronDown size={11} />
                                                        </button>
                                                    </div>

                                                    <span className="text-[8px] font-mono border border-slate-700/40 text-slate-500 px-1 rounded-sm">
                                                        {project.screenshots?.length || 0} imgs
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Right Pane: Fields Editor */}
                            {activeProject ? (
                                <div className="lg:col-span-3 bg-surface/10 border border-border/40 rounded-2xl p-6 sm:p-8 backdrop-blur-md space-y-8">
                                    <div>
                                        <h2 className="text-2xl font-display font-semibold text-white tracking-wide border-b border-border/25 pb-4 mb-6 flex items-center gap-3">
                                            <Info size={18} className="text-accent" />
                                            Edit: <span className="text-accent">{activeProject.title}</span>
                                        </h2>
                                        
                                        {/* Standard Details Form */}
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2">Project Title</label>
                                                <input 
                                                    type="text"
                                                    value={activeProject.title}
                                                    onChange={(e) => updateProjectField('title', e.target.value)}
                                                    className="w-full bg-[#101018]/50 border border-border rounded-xl px-4 py-3 text-sm text-white focus:border-accent/40 outline-none transition-colors font-display text-lg"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2">Featured Project</label>
                                                <select 
                                                    value={activeProject.isFeatured ? 'true' : 'false'}
                                                    onChange={(e) => updateProjectField('isFeatured', e.target.value === 'true')}
                                                    className="w-full bg-[#101018]/50 border border-border rounded-xl px-4 py-3 text-sm text-white focus:border-accent/40 outline-none transition-colors"
                                                >
                                                    <option value="true">Yes, show as featured</option>
                                                    <option value="false">No, standard archive</option>
                                                </select>
                                            </div>

                                            <div className="md:col-span-2">
                                                <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2">Description / Pitch Summary</label>
                                                <textarea 
                                                    value={activeProject.description}
                                                    rows={3}
                                                    onChange={(e) => updateProjectField('description', e.target.value)}
                                                    className="w-full bg-[#101018]/50 border border-border rounded-xl px-4 py-3 text-sm text-white focus:border-accent/40 outline-none transition-colors resize-none leading-relaxed"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2">GitHub Repository URL</label>
                                                <input 
                                                    type="text"
                                                    value={activeProject.links?.github || ''}
                                                    onChange={(e) => updateProjectLinks('github', e.target.value)}
                                                    placeholder="https://github.com/..."
                                                    className="w-full bg-[#101018]/50 border border-border rounded-xl px-4 py-3 text-sm text-white focus:border-accent/40 outline-none transition-colors font-mono text-xs"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2">Live Demo URL</label>
                                                <input 
                                                    type="text"
                                                    value={activeProject.links?.demo || ''}
                                                    onChange={(e) => updateProjectLinks('demo', e.target.value)}
                                                    placeholder="https://..."
                                                    className="w-full bg-[#101018]/50 border border-border rounded-xl px-4 py-3 text-sm text-white focus:border-accent/40 outline-none transition-colors font-mono text-xs"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2">Hugging Face URL (Optional)</label>
                                                <input 
                                                    type="text"
                                                    value={activeProject.links?.hf || ''}
                                                    onChange={(e) => updateProjectLinks('hf', e.target.value)}
                                                    placeholder="https://huggingface.co/spaces/..."
                                                    className="w-full bg-[#101018]/50 border border-border rounded-xl px-4 py-3 text-sm text-white focus:border-accent/40 outline-none transition-colors font-mono text-xs"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Screenshots Manager */}
                                    <div className="border-t border-border/20 pt-8">
                                        <h3 className="text-md font-display font-semibold text-white mb-4 flex items-center gap-2">
                                            <Eye size={16} className="text-accent2" /> Screenshot Asset Manager
                                        </h3>
                                        <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                                            Enter local paths (e.g. <code className="text-accent font-mono">/projects/chill-space/3.png</code>) that exist under your project's <code className="text-slate-400 font-mono">public/projects/</code> folder.
                                        </p>

                                        {/* Screenshot list */}
                                        <div className="grid sm:grid-cols-2 gap-3 mb-4">
                                            {activeProject.screenshots && activeProject.screenshots.length > 0 ? (
                                                activeProject.screenshots.map((screen, sIdx) => (
                                                    <div key={sIdx} className="flex items-center gap-3 p-3 bg-primary/20 border border-border/50 rounded-xl justify-between">
                                                        <div className="flex items-center gap-2 min-w-0">
                                                            <span className="font-mono text-[10px] text-slate-500">[ {sIdx + 1} ]</span>
                                                            <span className="font-mono text-xs text-slate-300 truncate" title={screen}>{screen}</span>
                                                        </div>
                                                        <button 
                                                            onClick={() => handleDeleteScreenshot(sIdx)}
                                                            className="p-1.5 hover:bg-red-500/10 hover:text-red-400 rounded-lg text-slate-500 transition-colors shrink-0"
                                                            title="Delete screenshot path"
                                                        >
                                                            <Trash2 size={13} />
                                                        </button>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="sm:col-span-2 text-center py-6 border border-dashed border-border/60 rounded-xl text-slate-550 text-xs">
                                                    No screenshot paths mapped to this project yet. Add one below!
                                                </div>
                                            )}
                                        </div>

                                        {/* Add screenshot path */}
                                        <div className="flex gap-2">
                                            <input 
                                                type="text"
                                                placeholder={`e.g. /projects/chill-space/3.png`}
                                                value={newScreenshot}
                                                onChange={(e) => setNewScreenshot(e.target.value)}
                                                onKeyDown={(e) => e.key === 'Enter' && handleAddScreenshot()}
                                                className="flex-grow bg-[#101018]/50 border border-border rounded-xl px-4 py-2.5 text-xs text-white focus:border-accent/40 outline-none transition-colors font-mono"
                                            />
                                            <button 
                                                onClick={handleAddScreenshot}
                                                className="flex items-center gap-1.5 bg-accent2/10 hover:bg-accent2/20 border border-accent2/25 text-accent2 px-4 py-2.5 rounded-xl text-xs font-semibold font-mono transition-colors whitespace-nowrap"
                                            >
                                                <Plus size={14} /> Add path
                                            </button>
                                        </div>
                                    </div>

                                    {/* Tech Stack Tags */}
                                    <div className="border-t border-border/20 pt-8">
                                        <h3 className="text-md font-display font-semibold text-white mb-4 flex items-center gap-2">
                                            <Wrench size={16} className="text-accent" /> Tech Stack Tags
                                        </h3>
                                        
                                        {/* Tags list */}
                                        <div className="flex flex-wrap gap-2 mb-5">
                                            {activeProject.techStack.map((tech) => (
                                                <span key={tech} className="tech-pill flex items-center gap-1.5 text-xs">
                                                    {tech}
                                                    <button 
                                                        onClick={() => handleDeleteTech(tech)}
                                                        className="hover:text-red-400 font-bold ml-0.5 select-none"
                                                    >
                                                        ×
                                                    </button>
                                                </span>
                                            ))}
                                        </div>

                                        {/* Add tech tag */}
                                        <div className="flex gap-2 max-w-sm">
                                            <input 
                                                type="text"
                                                placeholder="Add tech tag (e.g. Redux)"
                                                value={newTech}
                                                onChange={(e) => setNewTech(e.target.value)}
                                                onKeyDown={(e) => e.key === 'Enter' && handleAddTech()}
                                                className="flex-grow bg-[#101018]/50 border border-border rounded-xl px-4 py-2 text-xs text-white focus:border-accent/40 outline-none transition-colors font-mono"
                                            />
                                            <button 
                                                onClick={handleAddTech}
                                                className="bg-accent/10 hover:bg-accent/20 border border-accent/25 text-accent px-4 py-2 rounded-xl text-xs font-semibold font-mono transition-colors"
                                            >
                                                Add
                                            </button>
                                        </div>
                                    </div>

                                    {/* Team Members */}
                                    <div className="border-t border-border/20 pt-8">
                                        <h3 className="text-md font-display font-semibold text-white mb-4 flex items-center gap-2">
                                            <Users size={16} className="text-accent" /> Project Team Members (Optional)
                                        </h3>
                                        
                                        {/* Team list */}
                                        <div className="flex flex-wrap gap-2 mb-5">
                                            {activeProject.team && activeProject.team.length > 0 ? (
                                                activeProject.team.map((member, mIdx) => (
                                                    <span key={mIdx} className="tech-pill flex items-center gap-1.5 text-xs border-accent2/20 bg-accent2/5 text-slate-300">
                                                        <span>{member.name} {member.role ? `(${member.role})` : ''}</span>
                                                        <button 
                                                            onClick={() => handleDeleteTeamMember(mIdx)}
                                                            className="hover:text-red-400 font-bold ml-0.5 select-none"
                                                        >
                                                            ×
                                                        </button>
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="text-xs text-slate-500 italic">Personal Project (No team members mapped)</span>
                                            )}
                                        </div>

                                        {/* Add team member */}
                                        <div className="flex flex-wrap gap-2 max-w-xl">
                                            <input 
                                                type="text"
                                                placeholder="Member Name"
                                                value={newTeamName}
                                                onChange={(e) => setNewTeamName(e.target.value)}
                                                className="flex-1 bg-[#101018]/50 border border-border rounded-xl px-4 py-2 text-xs text-white focus:border-accent/40 outline-none transition-colors"
                                            />
                                            <input 
                                                type="text"
                                                placeholder="Role (e.g. Lead Dev, optional)"
                                                value={newTeamRole}
                                                onChange={(e) => setNewTeamRole(e.target.value)}
                                                className="flex-1 bg-[#101018]/50 border border-border rounded-xl px-4 py-2 text-xs text-white focus:border-accent/40 outline-none transition-colors"
                                            />
                                            <button 
                                                onClick={handleAddTeamMember}
                                                className="bg-accent/10 hover:bg-accent/20 border border-accent/25 text-accent px-4 py-2 rounded-xl text-xs font-semibold font-mono transition-colors"
                                            >
                                                Add Member
                                            </button>
                                        </div>
                                    </div>

                                    {/* Features List */}
                                    <div className="border-t border-border/20 pt-8">
                                        <h3 className="text-md font-display font-semibold text-white mb-4 flex items-center gap-2">
                                            <ListTodo size={16} className="text-accent" /> Features & Architecture
                                        </h3>

                                        {/* Features list */}
                                        <div className="space-y-2 mb-4">
                                            {activeProject.features.map((feat, fIdx) => (
                                                <div key={fIdx} className="flex items-start gap-3 p-3 bg-primary/10 border border-border/40 rounded-xl text-xs leading-relaxed text-slate-350">
                                                    <span className="text-accent select-none mt-0.5">•</span>
                                                    <span className="flex-grow">{feat}</span>
                                                    <button 
                                                        onClick={() => handleDeleteFeature(fIdx)}
                                                        className="p-1 hover:bg-red-500/10 hover:text-red-400 rounded text-slate-500 transition-colors shrink-0"
                                                    >
                                                        <Trash2 size={12} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Add feature */}
                                        <div className="flex gap-2">
                                            <input 
                                                type="text"
                                                placeholder="Add feature description..."
                                                value={newFeature}
                                                onChange={(e) => setNewFeature(e.target.value)}
                                                onKeyDown={(e) => e.key === 'Enter' && handleAddFeature()}
                                                className="flex-grow bg-[#101018]/50 border border-border rounded-xl px-4 py-2 text-xs text-white focus:border-accent/40 outline-none transition-colors"
                                            />
                                            <button 
                                                onClick={handleAddFeature}
                                                className="bg-accent/10 hover:bg-accent/20 border border-accent/25 text-accent px-4 py-2 rounded-xl text-xs font-semibold font-mono transition-colors whitespace-nowrap"
                                            >
                                                Add Feature
                                            </button>
                                        </div>
                                    </div>

                                    {/* Danger Zone: Delete Project */}
                                    <div className="border-t border-red-500/10 pt-8 flex flex-col sm:flex-row gap-4 justify-between sm:items-center">
                                        <div>
                                            <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">Danger Zone</h4>
                                            <p className="text-[11px] text-slate-550">This action permanently deletes this project from your local list.</p>
                                        </div>
                                        <button 
                                            onClick={() => handleDeleteProject(activeProjectIdx)}
                                            className="flex items-center gap-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/25 text-red-400 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider font-mono transition-all self-start sm:self-center"
                                        >
                                            <Trash2 size={13} /> Delete Project
                                        </button>
                                    </div>

                                </div>
                            ) : (
                                <div className="lg:col-span-3 text-center py-20 bg-surface/10 border border-border/40 rounded-2xl text-slate-500">
                                    No active project selected.
                                </div>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="profile-tab"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="bg-surface/10 border border-border/40 rounded-2xl p-6 sm:p-8 backdrop-blur-md space-y-8"
                        >
                            <div>
                                <h2 className="text-2xl font-display font-semibold text-white tracking-wide border-b border-border/25 pb-4 mb-6 flex items-center gap-3">
                                    <User size={18} className="text-accent" />
                                    Edit Profile Information
                                </h2>
                                
                                <div className="grid md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
                                        <input 
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => updateProfileField('name', e.target.value)}
                                            className="w-full bg-[#101018]/50 border border-border rounded-xl px-4 py-3 text-sm text-white focus:border-accent/40 outline-none transition-colors"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2">Age</label>
                                        <input 
                                            type="number"
                                            value={data.age}
                                            onChange={(e) => updateProfileField('age', parseInt(e.target.value) || 0)}
                                            className="w-full bg-[#101018]/50 border border-border rounded-xl px-4 py-3 text-sm text-white focus:border-accent/40 outline-none transition-colors"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2">Location</label>
                                        <input 
                                            type="text"
                                            value={data.location}
                                            onChange={(e) => updateProfileField('location', e.target.value)}
                                            className="w-full bg-[#101018]/50 border border-border rounded-xl px-4 py-3 text-sm text-white focus:border-accent/40 outline-none transition-colors"
                                        />
                                    </div>

                                    <div className="md:col-span-3">
                                        <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2">Professional Role / Headline</label>
                                        <input 
                                            type="text"
                                            value={data.role}
                                            onChange={(e) => updateProfileField('role', e.target.value)}
                                            className="w-full bg-[#101018]/50 border border-border rounded-xl px-4 py-3 text-sm text-white focus:border-accent/40 outline-none transition-colors font-display text-lg"
                                        />
                                    </div>

                                    <div className="md:col-span-3">
                                        <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2">Bio Pitch Statement</label>
                                        <textarea 
                                            value={data.bio}
                                            rows={4}
                                            onChange={(e) => updateProfileField('bio', e.target.value)}
                                            className="w-full bg-[#101018]/50 border border-border rounded-xl px-4 py-3 text-sm text-white focus:border-accent/40 outline-none transition-colors resize-none leading-relaxed"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Contact Links */}
                            <div className="border-t border-border/20 pt-8">
                                <h3 className="text-md font-display font-semibold text-white mb-4 flex items-center gap-2">
                                    <Mail size={16} className="text-accent2" /> Social & Contact Links
                                </h3>
                                
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                                        <input 
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => updateProfileField('email', e.target.value)}
                                            className="w-full bg-[#101018]/50 border border-border rounded-xl px-4 py-3 text-sm text-white focus:border-accent/40 outline-none transition-colors font-mono"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2">LinkedIn URL Handle</label>
                                        <input 
                                            type="text"
                                            value={data.linkedin}
                                            onChange={(e) => updateProfileField('linkedin', e.target.value)}
                                            placeholder="linkedin.com/in/..."
                                            className="w-full bg-[#101018]/50 border border-border rounded-xl px-4 py-3 text-sm text-white focus:border-accent/40 outline-none transition-colors font-mono"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2">GitHub Profile URL</label>
                                        <input 
                                            type="text"
                                            value={data.github}
                                            onChange={(e) => updateProfileField('github', e.target.value)}
                                            className="w-full bg-[#101018]/50 border border-border rounded-xl px-4 py-3 text-sm text-white focus:border-accent/40 outline-none transition-colors font-mono"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2">Portfolio Website URL</label>
                                        <input 
                                            type="text"
                                            value={data.portfolio || ''}
                                            onChange={(e) => updateProfileField('portfolio', e.target.value)}
                                            className="w-full bg-[#101018]/50 border border-border rounded-xl px-4 py-3 text-sm text-white focus:border-accent/40 outline-none transition-colors font-mono"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Interests Manager */}
                            <div className="border-t border-border/20 pt-8">
                                <h3 className="text-md font-display font-semibold text-white mb-4 flex items-center gap-2">
                                    <Compass size={16} className="text-accent" /> Professional Interests & Focus Areas
                                </h3>

                                <div className="flex flex-wrap gap-2 mb-5">
                                    {data.interests && data.interests.map((interest) => (
                                        <span key={interest} className="tech-pill flex items-center gap-1.5 text-xs">
                                            {interest}
                                            <button 
                                                onClick={() => handleDeleteInterest(interest)}
                                                className="hover:text-red-400 font-bold ml-0.5 select-none"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>

                                <div className="flex gap-2 max-w-sm">
                                    <input 
                                        type="text"
                                        placeholder="Add focus area (e.g. LLMOps)"
                                        value={newInterest}
                                        onChange={(e) => setNewInterest(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleAddInterest()}
                                        className="flex-grow bg-[#101018]/50 border border-border rounded-xl px-4 py-2 text-xs text-white focus:border-accent/40 outline-none transition-colors"
                                    />
                                    <button 
                                        onClick={handleAddInterest}
                                        className="bg-accent/10 hover:bg-accent/20 border border-accent/25 text-accent px-4 py-2 rounded-xl text-xs font-semibold font-mono transition-colors"
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>

                            {/* Hobbies Manager */}
                            <div className="border-t border-border/20 pt-8">
                                <h3 className="text-md font-display font-semibold text-white mb-4 flex items-center gap-2">
                                    <Heart size={16} className="text-accent" /> Personal Hobbies & Pursuits
                                </h3>

                                <div className="flex flex-wrap gap-2 mb-5">
                                    {data.hobbies && data.hobbies.map((hobby) => (
                                        <span key={hobby} className="tech-pill flex items-center gap-1.5 text-xs border-accent2/20 bg-accent2/5 text-slate-350">
                                            {hobby}
                                            <button 
                                                onClick={() => handleDeleteHobby(hobby)}
                                                className="hover:text-red-400 font-bold ml-0.5 select-none"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>

                                <div className="flex gap-2 max-w-sm">
                                    <input 
                                        type="text"
                                        placeholder="Add hobby (e.g. Photography)"
                                        value={newHobby}
                                        onChange={(e) => setNewHobby(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleAddHobby()}
                                        className="flex-grow bg-[#101018]/50 border border-border rounded-xl px-4 py-2 text-xs text-white focus:border-accent/40 outline-none transition-colors"
                                    />
                                    <button 
                                        onClick={handleAddHobby}
                                        className="bg-accent2/10 hover:bg-accent2/20 border border-accent2/25 text-accent2 px-4 py-2 rounded-xl text-xs font-semibold font-mono transition-colors"
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>

                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ── EXPORT CODE MODAL OVERLAY ── */}
                <AnimatePresence>
                    {showExportModal && (
                        <div className="fixed inset-0 bg-[#000000]/80 z-50 flex items-center justify-center p-4">
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-surface border border-border rounded-2xl w-full max-w-3xl p-6 sm:p-8 flex flex-col max-h-[85vh] shadow-[0_24px_50px_rgba(0,0,0,0.8)]"
                            >
                                <div className="flex items-center justify-between border-b border-border/40 pb-4 mb-4">
                                    <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
                                        <span>💾</span> Export Configuration Code
                                    </h3>
                                    <button 
                                        onClick={() => setShowExportModal(false)}
                                        className="text-slate-500 hover:text-white text-lg font-bold outline-none border-none"
                                    >
                                        ×
                                    </button>
                                </div>

                                <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                                    Copy the code below, open <code className="text-accent font-mono">constants.ts</code> in your editor, select all, and replace the contents with this code block. Then push and deploy to see changes live worldwide!
                                </p>

                                <div className="flex-grow overflow-auto bg-[#0a0a0f] border border-border/80 rounded-xl p-4 font-mono text-xs text-slate-300 select-all relative mb-6">
                                    <pre className="whitespace-pre-wrap">{getExportCodeString()}</pre>
                                </div>

                                <div className="flex gap-3 justify-end mt-auto">
                                    <button 
                                        onClick={() => setShowExportModal(false)}
                                        className="px-4 py-2 rounded-lg border border-border text-xs uppercase tracking-wider font-mono text-slate-400 hover:text-white hover:bg-white/5 transition-colors outline-none"
                                    >
                                        Close
                                    </button>
                                    
                                    <button 
                                        onClick={handleCopyCode}
                                        className="flex items-center gap-2 bg-accent text-primary px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider font-mono hover:opacity-95 transition-all shadow-md shadow-accent/5 outline-none"
                                    >
                                        {copied ? (
                                            <>
                                                <Check size={14} /> Copied!
                                            </>
                                        ) : (
                                            <>
                                                <Copy size={14} /> Copy Code
                                            </>
                                        )}
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

            </div>
        </section>
    );
}
