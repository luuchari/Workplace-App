import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { SqliteService } from '../services/sqlite.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonButton, IonLabel,IonBackButton, IonItem,IonList, IonFab, IonFabButton, IonIcon, IonToast, IonModal, IonButtons, IonInput, IonCol, IonCard, IonRow, IonText, IonCheckbox } from '@ionic/angular/standalone';

interface Employee {
  id: number;
  name: string;
  position?: string; // Made optional to handle cases where 'position' might be missing
}

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.page.html',
  styleUrls: ['./employee-list.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  imports: [IonRow,IonText, IonCol,IonBackButton, IonButtons, IonIcon, IonFabButton, IonFab, IonItem, IonLabel, IonContent, IonHeader,IonTitle, IonToolbar, IonList, CommonModule, FormsModule]
})
export class EmployeeListPage  { 
  modal: any; // Define the modal property
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  emp: { name: string; department: string }[] = [];
  searchTerm: string = '';
  name: string = '';
  position: string = '';
 
  constructor(private db: SqliteService, private navCtrl: NavController) { }


  cancel() {
    this.modal.dismiss(null, 'cancel');
  }
  
  confirm() {
    this.modal.dismiss(this.filteredEmployees, 'confirm');
    this.addEmployee();
  }

  onWillDismiss(event: any): void {
    console.log('Modal dismissed', event);
  }
  dismissModel() {
    // Logic to dismiss the modal
    console.log('Modal dismissed');
  }

  addEmployee(): void {
    const newEmployee: Employee = { id: Date.now(), name: 'New Employee', position: 'Unknown' };
    this.employees.push(newEmployee);
    this.filterEmployees(); // Update the filtered list if necessary
  }

  ionViewWillEnter() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.db.getEmployees().then((res: any[]) => {
      this.employees = res.map(emp => ({
        id: emp.id,
        name: emp.name,
        position: emp.position || 'Unknown' // Provide a default value if 'position' is missing
      }));
      this.filteredEmployees = this.employees;
    });
  }

  filterEmployees() {
    const keyword = this.searchTerm.toLowerCase();
    this.filteredEmployees = this.employees.filter(emp =>
      emp.name.toLowerCase().includes(keyword) ||
      (emp.position ?? '').toLowerCase().includes(keyword) ||
      emp.id.toString().includes(keyword)
    );
  }

  editEmployee(emp: Employee) {
    this.navCtrl.navigateForward('/employee-form', { state: emp });
  }

  deleteEmployee(id: number): void {
    this.db.deleteEmployee(id).then(() => this.loadEmployees());
  }
}

  