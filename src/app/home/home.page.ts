import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { IonicModule} from '@ionic/angular';
import { Router, RouterModule, Routes } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle,IonItemSliding, IonContent, IonSearchbar, IonItem, IonLabel, IonText,IonList,IonCard,IonRow,IonCol,IonFab,IonFabButton,IonIcon, } from '@ionic/angular/standalone';
import { SqliteService } from '../services/sqlite.service';

interface Employee {
  id: number;
  name: string;
  department: string;
  emp: { name: string; department: string; }[];
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonItem,
    IonList,
    IonItemSliding,
    
    
  ],
})
export class HomePage {
  employees: Employee[] = []; // Ensure employees is always initialized
  emp: any[] = [];
  filteredEmployees: { name: string; position: string }[] = this.employees.map(emp => ({
    name: emp.name,
    position: emp.department
    
  }));
  searchTerm = '';
  name: string = '';
  department: string = '';
position: any;
  constructor(private router: Router) { 
    
  }

  filterEmployees() {
    this.filteredEmployees = this.employees.filter((employee: Employee) =>
      employee.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    ).map((employee: Employee) => ({
      name: employee.name,
      position: employee.department
    }));
  }
  viewList(name: string): void {
    console.log('View list for:', name);
  }

 
  onWillDismiss(event: any): void {
    console.log('Modal dismissed', event);
  }
  dismissModel() {
    // Logic to dismiss the modal
    console.log('Modal dismissed');
  }

  cancel() {
    console.log('Cancel button clicked');
  }
  confirm() {
    // Add logic to handle confirmation
    console.log('confirm button clicked')
  }

  deleteEmployee(emp: any): void {
    const index = this.employees.indexOf(emp);
    if (index > -1) {
      this.employees.splice(index, 1);
      this.filterEmployees(); // Update the filtered list if necessary
    }
  }
addEmployee(): void {
  // Logic to add a new employee
  const newEmployee: Employee = { id: Date.now(), name: 'New Employee', department: 'Unknown', emp: [] };
  this.employees.push(newEmployee);
  console.log('Employee added:', newEmployee);
}

  editEmployee(emp: any): void {
    console.log('Edit employee:', emp);
    // Add your logic for editing an employee here
  }
  
  }

  

const routes: Routes = [
  {
    path: '',
    component: HomePage
  }
];

@NgModule({
  imports: [
    FormsModule,
    IonicModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule {}

function filterEmployees(searchTerm: string, employees: { name: string; position: string }[]): { name: string; position: string }[] {
  if (!searchTerm) {
    return employees;
  }
  return employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
}
export class HomePageComponent {
  employees = [
    { name: 'John Doe', position: 'Manager' },
    { name: 'Jane Smith', position: 'Developer' }
  ];
  filteredEmployees: { name: string; position: string }[] = this.employees;
  searchTerm = '';
  constructor(private router: Router) { }

  editEmployee(emp: any): void {
    console.log('Edit employee:', emp);
    // Add your logic for editing an employee here
  }
  
  ionViewWillEnter() {
     this.loadEmployees();
  }

  loadEmployees() {
    this.filteredEmployees = this.employees;
  }

  filterEmployees() {
    // Add logic to filter employees based on searchTerm
  }
}


