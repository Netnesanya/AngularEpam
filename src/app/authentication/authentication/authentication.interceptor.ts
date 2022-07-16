import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthService} from "../../shared/services/auth.service";
import {Observable} from "rxjs";


@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {


  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken()
    const request = req.clone({
      headers: req.headers.set('Authorization', token ?? '')
    })
    return next.handle(request)


  }
}

