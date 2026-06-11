import { computed, Service, signal } from '@angular/core';
import { LoginResponse } from '../../features/auth/models/login-response.model';

const storageKey = 'loginUserData';

@Service()
export class LoginUserStateService {
  private _user = signal<LoginResponse | null>(this.loadLocalStorage());

  // public readonly signal to get logged-in user data
  readonly user = this._user.asReadonly();
  readonly isLoggedIn = computed(() => !!this._user()?.token);
  readonly role = computed(() => this._user()?.role || '');

  // Load local storage data for once
  loadLocalStorage(): LoginResponse | null {
    const localStorageData = localStorage.getItem(storageKey);
    return localStorageData ? JSON.parse(localStorageData) : null;
  }

  // Set user data (use after successful login or profile fetch)
  setUser(user: LoginResponse): void {
    this._user.set(user);
    this.saveToLocalStorage(user);
  }

  // Save user data to localStorage
  saveToLocalStorage(user: LoginResponse): void {
    localStorage.setItem(storageKey, JSON.stringify(user));
  }

  // Patch partial user data (profile updates)
  patchUser(partialData: Partial<LoginResponse>): void {
    const curentData = this._user();
    if (!curentData) return;

    const updatedUserData = { ...curentData, ...partialData };
    this.setUser(updatedUserData);
  }

  clearUser(): void {
    this._user.set(null);
    localStorage.removeItem(storageKey);
  }
}
