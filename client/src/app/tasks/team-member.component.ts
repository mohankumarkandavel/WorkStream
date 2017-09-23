import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {Task} from "./task.model";

@Component({
  selector: 'app-team-member',
  templateUrl: './team-member.component.html',
  styleUrls: ['./tasks.component.css']
})

export class TeamMemberComponent implements OnInit {

  private pendingTasks: Task[];
  private assignedTasks: Task[];

  constructor(private http: Http) {
  }

  ngOnInit(): void {
    this.getAllTasks();
  }

  getAllTasks() {
    this.http.get('http://localhost:8080/task').subscribe(
      (response) => {
        if (response.ok) {
          let tasks = JSON.parse(response.text());
          this.pendingTasks = tasks.filter(task => task.status === "PENDING")
          this.assignedTasks = tasks.filter(task => task.status === "ASSIGNED")
        }
      }
    );
  }
}
