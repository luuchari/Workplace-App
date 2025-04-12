import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SqliteService {

  constructor() { }
async getEmployees(): Promise<Employee[]> {
  // Mock implementation, replace with actual database logic
  return [
    { id: 1, name: 'John Doe', department: 'HR' },
    { id: 2, name: 'Jane Smith', department: 'IT' },
    { id: 3, name: 'Alice Johnson', department: 'Finance' }
  ];
}
async deleteEmployee(id: number): Promise<void> {
  // Implement the logic to delete an employee from the database
  // Example:
  const query = `DELETE FROM employees WHERE id = ?`;
  await this.executeSql(query, [id]);
}
private async executeSql(query: string, params: any[]): Promise<any> {
  // Placeholder for executing SQL queries
  // Replace this with your actual database execution logic
  console.log(`Executing SQL: ${query} with params: ${params}`);
}

}

interface Employee {
  id: number;
  name: string;
  department: string;
}
