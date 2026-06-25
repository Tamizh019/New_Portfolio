import { PORTFOLIO_DATA } from '../../constants';
import { UserData } from '../../types';

const STORAGE_KEY = 'portfolio_data_override';

export function getLocalPortfolioData(): UserData {
    if (typeof window === 'undefined') return PORTFOLIO_DATA;
    
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            console.error("Failed to parse stored portfolio overrides, falling back to static constants.", e);
            return PORTFOLIO_DATA;
        }
    }
    return PORTFOLIO_DATA;
}

export function saveLocalPortfolioData(data: UserData): void {
    if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
}

export function resetLocalPortfolioData(): void {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY);
    }
}
