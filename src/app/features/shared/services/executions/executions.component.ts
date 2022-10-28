import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExecutionsService } from './executions.service';

@Component({
  selector: 'app-executions',
  templateUrl: './executions.component.html',
  styleUrls: ['./executions.component.css']
})

/**
 * TODO:
 *  conectar al servicio
 *  abrir modal con los detalles de la ejecucion
 *  navegar hacia instancia de la ejecucion (salvo que ya se pida ej de ins)
 */
export class ExecutionsComponent implements OnInit, OnChanges {

  constructor(
              private execService: ExecutionsService,
              private router: Router
              ) { }

  @Input() instance;
  @Input() hasNewExecution: boolean;
  executions = [];
  displayModal: boolean;
  selectedExecution: any;
  execMock = [
    {
      "id": "2342hgj-h4g2j3-hbv2hj34-fbj458",
      "instance": "1",
      "created": "2022-03-30T15:45:05.018832Z",
      "finished": "null",
      "execution_time": "null",
      "owner": "admin",
      "status": "PENDING",
      "has_errors": false,
      "num_errors": "0",
      "current_task": "null",
      "progress": "0.0"
    }
  ];

  ngOnInit(): void {
    this.getExecutions()
  }


  ngOnChanges(): void {
    this.getExecutions()
  }


  getExecutions(){
    if (this.instance) {
      this.getExecutionsByIns();
    } else {
      this.getExecutionsList();
    }
  }

  /**
   * Get all executions.
   */
  getExecutionsList() {
    this.execService.getExecutions().subscribe(
      (executions) => {
        this.executions = executions;
      }
    );
  }

  /**
   * get executions by instance. pass instance name.
   */
  getExecutionsByIns() {
    this.execService.getExecutionByInstance(this.instance).subscribe(
      (executions) => {
        this.executions = executions;
      }
    );
  }

  /**
   * Get single execution
   */
  getExecution(execution) {
    this.execService.getExecution(execution.id).subscribe(
      (data) => {
        console.log('???????', data)
        this.selectedExecution = data;
      }
    );
  }

  /**
   * Open modal to display the data of a single execution.
   */
  openExecutionModal(exec) {
  //  this.selectedExecution = exec;
    this.getExecution(exec);
    this.displayModal = true;
  }

  navigate(url) {
    this.router.navigate([url]);
  }

}
