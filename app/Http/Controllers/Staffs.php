<?php

namespace App\Http\Controllers;

use App\Models\Staff;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Hash;
use Auth;

//use Auth;


class Staffs extends Controller
{

    public function index($id = null) {
        if ($id == null) {
            $user   = Auth::user();

            $staffs = DB::table('staff')
                    ->leftjoin('staffroles', 'staff.RID', '=', 'staffroles.id')
                    ->select('staff.*', 'staffroles.Name as roleName')
                    ->where('staff.CID', '=' , $user->CID )
                    ->get();
            return $staffs;
        } else {
            return $this->show($id);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request) {
        $user = Auth::user();

        $staff = new Staff;

        $staff->RID      = $request->input('RID');
        // $staff->CID      = $request->input('cid');
        $staff->CID      = $user->CID;

        $staff->Title    = $request->input('Title');
        $staff->FName    = $request->input('FName');
        $staff->LName    = $request->input('LName');
        $staff->PhoneNo  = $request->input('PhoneNo');
        $staff->Email    = $request->input('email');
        $staff->password = $password = Hash::make('123456');
        $staff->Picture  = $request->input('Picture');

        $staff->save();

        $staffs = DB::table('staff')
                ->join('staffroles', 'staff.RID', '=', 'staffroles.id')
                ->select('staff.*', 'staffroles.Name as roleName')
                ->where('staff.id', '=' , $staff->id )
                ->get();
        return $staffs;

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id) {
        return Staff::find($id);
        // $staffs = DB::table('staff')
        //         ->join('staffroles', 'staff.RID', '=', 'staffroles.id')
        //         ->select('staff.*', 'staffroles.Name as roleName')
        //         ->where('staff.id', '=' , $staff->id )
        //         ->get();
        // return $staffs;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id) {
        $staff = Staff::find($id);

        $staff->RID = $request->input('RID');
        // $staff->CID = $request->input('cid');

        $staff->Title = $request->input('Title');
        $staff->FName = $request->input('FName');
        $staff->LName = $request->input('LName');
        $staff->PhoneNo = $request->input('PhoneNo');
        $staff->Email = $request->input('email');
        $staff->Picture = $request->input('Picture');

        $staff->save();

        $staffs = DB::table('staff')
                ->join('staffroles', 'staff.RID', '=', 'staffroles.id')
                ->select('staff.*', 'staffroles.Name as roleName')
                ->where('staff.id', '=' , $staff->id )
                ->get();
        return $staffs;



        //return "Sucess updating Staff #" . $staff->id;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy(Request $request, $id) {
        $staff = Staff::find($id);

        $staff->delete();

        return "Staff record successfully deleted #" . $id;
    }
}
