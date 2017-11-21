<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Auth;

class StaffLoginController extends Controller
{
    public function __construct()
    {
        $this->middleware('guest:staff');//->except('logout');
    }

    public function showLoginForm()
    {
      return view('auth.staff-login');
    }

    public function login(Request $request)
    {
      // // //Clear session before
      // Auth::logout();
      //Clear session before
      Auth::guard('web')->logout();
      // Validate The form Data
      $this->Validate($request,[
        'email'    => 'required|email',
        'password' => 'required|min:6',
      ]);
      // $credentials
      // Attempt to log Staff In
        if (Auth::guard('staff')->attempt(['email' => $request->email, 'password' => $request->password], $request->remember)) {
          // If Successful, then redirect to intended location
            return redirect()->intended(route('user.dashboard'));
        }

      // If unsuccessful, then redirect to login form with form Data
        return redirect()->back()->withInput($request->only('email', 'remember'));
    }
}
