<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
    {
      if (Auth::guard($guard)->check()) {

          if (Auth::guard('web')->check()) {
            //Clear session before
            Auth::guard('staff')->logout();
            if (Auth::user()->hasRole('SuperAdmin')) //If user has this //permission
            {
                return redirect('/superadmin/dashboard');
            }
            elseif (Auth::user()->hasRole('Admin')) //If user has this //permission
            {
                return redirect('/admin/dashboard');
            }
              //return redirect('/home');
          }
          elseif (Auth::guard('staff')->check()) {
              // //Clear session before
              // Auth::guard('web')->logout();
              return redirect('/user/dashboard');
          }
      }

        return $next($request);
    }
}
