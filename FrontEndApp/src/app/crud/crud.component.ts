import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Crudservice } from '../crudservice.service';
import { DataModel } from '../models/Data';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CRUDComponent implements OnInit {

  user_id:number=0;

  DataModelObj: DataModel[] =[];

  DataModelLoad : DataModel[] = [];

  constructor(private api: Crudservice ) { }

  ngOnInit(): void {
    this.showAllData();
  }

  form = {
    inputData: new FormGroup({
      title: new FormControl('',[Validators.required, Validators.minLength(5)]),
      firstname: new FormControl('',[Validators.required, Validators.minLength(3)]),
      lastname: new FormControl('',[Validators.required, Validators.minLength(3)]),
      role: new FormControl('',[Validators.required,Validators.minLength(1),Validators.pattern("^[0-1]*$"),Validators.maxLength(1)]),
      password: new FormControl('',[Validators.required, Validators.minLength(6)]),
      confirmpassword: new FormControl('',[Validators.required, Validators.minLength(6)]),
      email: new FormControl('',[Validators.required, Validators.email]),
    }),
    updateData:new FormGroup({
      title: new FormControl('',[Validators.required, Validators.minLength(5)]),
      firstname: new FormControl('',[Validators.required, Validators.minLength(3)]),
      lastname: new FormControl('',[Validators.required, Validators.minLength(3)]),
      role: new FormControl('',[Validators.required,Validators.minLength(1),Validators.pattern("^[0-1]*$"),Validators.maxLength(1)]),
      password: new FormControl('',[Validators.required, Validators.minLength(6)]),
      confirmpassword: new FormControl('',[Validators.required, Validators.minLength(6)]),
      email: new FormControl('',[Validators.required, Validators.email]),
    })
  }



  get Title(){
    return this.form.inputData.get('title');
  }

  get Firstname(){
    return this.form.inputData.get('firstname');
  }

  get Lastname(){
    return this.form.inputData.get('lastname');
  }

  get Password(){
    return this.form.inputData.get('password');
  }

  get ConfirmPassword(){
    return this.form.inputData.get('confirmpassword');
  }

  get Email(){
    return this.form.inputData.get('email');
  }

  get Role(){
    return this.form.inputData.get('role');
  }

  tambahData(){

    this.DataModelObj = this.form.inputData.value;
    this.api.postData(this.DataModelObj)
     .subscribe(res => {
      alert("Data has been added successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.form.inputData.reset();
      this.showAllData();
     },
     err=>{
       alert("Something went wrong")
     })
  }
  
  showAllData(){
    this.api.getData()
     .subscribe(res =>{
       this.DataModelLoad = res;
     })
  }

  deleteData(item:any){
    this.api.deleteData(item.id)
    .subscribe(res =>{
      alert("Data has been deleted");
      this.showAllData();
    })
  }

  onEdit(item: any){
    this.user_id = item.id;
    this.form.updateData.controls['title'].setValue(item.title)
    this.form.updateData.controls['firstname'].setValue(item.firstName)
    this.form.updateData.controls['lastname'].setValue(item.lastName)
    this.form.updateData.controls['email'].setValue(item.email)
    if(item.role ==' User'){
      this.form.updateData.controls['role'].setValue('1')
    }
    else
    {
      this.form.updateData.controls['role'].setValue('0')
    }
   
    this.form.updateData.controls['password'].setValue(item.password)
    this.form.updateData.controls['confirmpassword'].setValue(item.confirmpassword)
  }

  editData(){
    this.DataModelObj = this.form.updateData.value;
    console.log(this.user_id,this.DataModelObj)
    this.api.updateData(this.DataModelObj, this.user_id)
    .subscribe(res=> {
      alert("Update Success")
      let ref = document.getElementById('cancel2')
      ref?.click();
      this.form.updateData.reset();
      this.showAllData();
    })
  }
}//class