import React, { useState } from 'react';
import { X, LogIn, UserPlus, Shield, Mail, Lock, User, Sparkles } from 'lucide-react';

export default function AuthModal({ initialMode = 'login', onClose }) {
  const [mode, setMode] = useState(initialMode);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMsg(mode === 'login' ? '¡Bienvenido a HeroVerse!' : '¡Cuenta creada con éxito!');
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div 
        className="relative w-full max-w-md bg-heroverse-darker rounded-3xl border border-slate-700 shadow-2xl p-8 text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-slate-900 hover:bg-heroverse-red text-slate-400 hover:text-white rounded-full border border-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-heroverse-blue to-heroverse-red p-0.5 mx-auto shadow-glow-blue">
            <div className="w-full h-full bg-heroverse-darker rounded-[14px] flex items-center justify-center">
              <Shield className="w-6 h-6 text-heroverse-gold" />
            </div>
          </div>
          <h3 className="font-hero text-3xl uppercase tracking-wider text-white">
            {mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </h3>
          <p className="text-xs text-slate-400">
            Accede al multiverso completo de HeroVerse
          </p>
        </div>

        {successMsg ? (
          <div className="p-4 bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-center font-bold text-sm rounded-xl animate-fade-in">
            {successMsg}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-semibold uppercase">Nombre</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Tu alias heroico..."
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-900 text-xs text-white placeholder-slate-500 rounded-xl border border-slate-800 focus:outline-none focus:border-heroverse-blue"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-semibold uppercase">Correo Electrónico</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  placeholder="ejemplo@heroverse.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900 text-xs text-white placeholder-slate-500 rounded-xl border border-slate-800 focus:outline-none focus:border-heroverse-blue"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-semibold uppercase">Contraseña</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900 text-xs text-white placeholder-slate-500 rounded-xl border border-slate-800 focus:outline-none focus:border-heroverse-blue"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-heroverse-blue to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-glow-blue transition-all"
            >
              {mode === 'login' ? 'Entrar a HeroVerse' : 'Registrarse Ahora'}
            </button>
          </form>
        )}

        <div className="mt-6 text-center text-xs text-slate-400 border-t border-slate-900 pt-4">
          {mode === 'login' ? (
            <p>
              ¿No tienes cuenta?{' '}
              <button 
                onClick={() => setMode('register')} 
                className="text-heroverse-gold font-bold hover:underline"
              >
                Regístrate aquí
              </button>
            </p>
          ) : (
            <p>
              ¿Ya tienes cuenta?{' '}
              <button 
                onClick={() => setMode('login')} 
                className="text-heroverse-blue font-bold hover:underline"
              >
                Inicia sesión
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
}
