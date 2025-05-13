import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(
        private http: HttpClient,
        private apiService: ApiService
    ) { }
    
    getUsers(): Observable<any> {
        return this.http.get(`${this.apiService.API_ENDPOINTS.users.getAll}`);
    }
    
    getUserById(id: number): Observable<any> {
        return this.http.get(`${this.apiService.API_ENDPOINTS.users.getById(id)}`);
    }

    createUser(userData: any): Observable<any> {
        return this.http.post(this.apiService.API_ENDPOINTS.users.create, userData);
    }
    
    updateUser(id: number, updatedData: any): Observable<any> {
        return this.http.put(this.apiService.API_ENDPOINTS.users.update(id), updatedData);
    }
    
    deleteUser(id: number): Observable<any> {
        return this.http.delete(this.apiService.API_ENDPOINTS.users.delete(id));
    }

}

