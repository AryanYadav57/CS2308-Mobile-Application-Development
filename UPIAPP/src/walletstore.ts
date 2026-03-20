import { create } from "zustand";

export interface Transaction {
  id: string;
  type: "sent" | "received";
  name: string;
  amount: number;
  date: string;
}

interface WalletState {
  balance: number;
  transactions: Transaction[];
  hasPinSet: boolean;
  pin: string | null;
  isAuthenticated: boolean;
  setPin: (pin: string) => void;
  authenticate: (pin: string) => boolean;
  logout: () => void;
  addTransaction: (t: Omit<Transaction, "id" | "date">) => void;
  addMoney: (amount: number) => void;
}

export const useWalletStore = create<WalletState>((set, get) => ({
  balance: 5000,
  transactions: [],
  hasPinSet: false,
  pin: null,
  isAuthenticated: false,
  
  setPin: (pin: string) => set({ pin, hasPinSet: true, isAuthenticated: true }),
  
  authenticate: (pinInput: string) => {
    const { pin } = get();
    if (pin === pinInput) {
      set({ isAuthenticated: true });
      return true;
    }
    return false;
  },

  logout: () => set({ isAuthenticated: false }),

  addTransaction: (t) =>
    set((s) => ({
      balance: t.type === "sent" ? s.balance - t.amount : s.balance + t.amount,
      transactions: [
        {
          ...t,
          id: Date.now().toString(),
          date: new Date().toLocaleDateString("en-IN"),
        },
        ...s.transactions,
      ],
    })),
    
  addMoney: (amount) =>
    set((s) => ({ balance: s.balance + amount })),
}));
