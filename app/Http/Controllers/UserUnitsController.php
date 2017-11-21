<?php

namespace App\Http\Controllers;

use App\Models\UserUnits;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Auth;


class UserUnitsController extends Controller
{
   /**
     * Display a listing of the resource.
     *
     * @return Response
     */

    public function index($id = null) {
        if ($id == null) {
            if (Auth::guard('web')->check()) {
              $user   = Auth::user();
            }
            elseif (Auth::guard('staff')->check()) {
              $user = Auth::guard('staff')->user();
            }
            if ($user->CID == "") {
              $user->CID = 0;
            }

            $units= UserUnits::orderBy('unit_name', 'asc')
                    // ->where('CID', 0)
                    ->where('CID', $user->CID)
                    ->get();
            return $units;

        }
        else
        {
            // echo $id;
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
        if (Auth::guard('web')->check()) {
          $user   = Auth::user();
        }
        elseif (Auth::guard('staff')->check()) {
          $user = Auth::guard('staff')->user();
        }
        if ($user->CID == "") {
          $user->CID = 0;
        }

        $units = new UserUnits;

        $units->CID               = $user->CID;
        //  $units->CID               = 0;
         $units->unit_name         = $request->input('unit_name');
         $units->abbrivation       = $request->input('abbrivation');
         $units->save();

         $RelativeUnits = $request->input('RelativeUnits');
         $unit2_name =  $request->input('uid');
         if($RelativeUnits)
         {
           for ($i=0; $i <sizeof($RelativeUnits); $i++) {
               $child_unit=$RelativeUnits[$i]['uid'];
               $child_value=$RelativeUnits[$i]['unit2_value'];
               $parent_value=$RelativeUnits[$i]['unit1_value'];
               DB::insert('insert into unit_measures (parent_unit, child_unit, value, parent_value ) values (?, ?, ?, ?)', [$units->id, $child_unit, $child_value,$parent_value]);

           }

         }

          return $units;

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {

        $units = UserUnits::find($id);
        $units['RelativeUnits']  = DB::table('unit_measures')
                        //  ->join('units', 'unit_measures.FID', '=', 'fooditems.id')
                         ->select('unit_measures.id','unit_measures.parent_unit','unit_measures.child_unit','unit_measures.value','unit_measures.parent_value')
                         ->where('unit_measures.parent_unit', $id)
                        //  ->orderBy('foodpanelfooditems.Order', 'asc')
                         ->get();
        //  $units  =  DB::table('units')
        //             ->join('unit_measures','units.id', '=','unit_measures.parent_unit')
         //
        //             ->where('units.id',$id)
        //             //->get();
        //             ->get(['units.id','units.unit_name','units.abbrivation','unit_measures.child_unit','unit_measures.value']);
            return $units;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id)
    {

        $units   = UserUnits::find($id);
        // $units->delete();

        // $units = new UserUnits;

         $units->unit_name         = $request->input('unit_name');
         $units->abbrivation       = $request->input('abbrivation');
         $units->save();

         $RelativeUnits = $request->input('RelativeUnits');
        //  $unit2_name =  $request->input('uid');
         if($RelativeUnits)
         {
           $delete = DB::table('unit_measures')->where('parent_unit', $units->id)->delete();
           for ($i=0; $i <sizeof($RelativeUnits); $i++)
           {
               $child_unit=$RelativeUnits[$i]['uid'];
               $child_value=$RelativeUnits[$i]['unit2_value'];
               $parent_value=$RelativeUnits[$i]['unit1_value'];
               DB::insert('insert into unit_measures (parent_unit, child_unit, value, parent_value) values (?, ?, ?, ?)', [$units->id, $child_unit, $child_value, $parent_value]);

           }

         }

          return $units;

        // $units = UserUnits::find($id);
        // $units->unit_name         = $request->input('unit_name');
        // $units->abbrivation       = $request->input('abbrivation');
        // $units->save();
        //
        //
        //
        // return $units;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
   	 public function destroy($id)
   	 {
   	 	//$unitsdel = DB::table('units')->where('id', $id)->delete();

        $units   = UserUnits::find($id);
        $units->delete();

        $delete = DB::table('unit_measures')->where('parent_unit', $units->id)->delete();

        return "Units record successfully deleted #" . $id;
    }


}
