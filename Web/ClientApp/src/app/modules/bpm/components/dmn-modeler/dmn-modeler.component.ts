import { Component, OnInit } from '@angular/core';
import { faFolderOpen, faSave } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import * as Modeler from "dmn-js/dist/dmn-modeler.production.min.js";

import Viewer from 'dmn-js';
@Component({
  selector: 'app-dmn-modeler',
  templateUrl: './dmn-modeler.component.html',
})
export class DmnModelerComponent implements OnInit {
  title = 'Angular/DMN';
  modeler;

  faFolderOpen = faFolderOpen;
  faSave = faSave;
  

  constructor(private http: HttpClient) {

  }
  ngOnInit(): void {
    this.modeler = new Modeler({
      container: '#canvas',
      width: '100%',
      height: '600px',
      keyboard: {
        bindTo: window
      }
    });
    this.new();
  }
  handleError(err: any) {
    if (err) {
      console.warn('Ups, error: ', err);
    }
  }

  new(): void {
    const url = '/assets/dmn/initial.dmn';

    this.loadFile(url);
  }
  load(): void {
    const url = '/assets/dmn/sample.dmn';

    this.loadFile(url);
  }
  loadFile(url): void {

    this.http.get(url, {
      headers: { observe: 'response' }, responseType: 'text'
    }).subscribe(
      (x: any) => {
        console.log('Fetched XML, now importing: ', x);
        //this.modeler.importXML(x, this.handleError);
        let this$ = this;

        this.modeler.importXML(x, function (err) {
          console.log('*********************');
          if (err) {

            this$.handleError;
            //console.log('error rendering', err);
          } else {
            this$.modeler
              .getActiveViewer()
              .get('canvas')
              .zoom('fit-viewport');
          }
        });
      },
      this.handleError
    );
  }
  save(): void {
    this.modeler.saveXML({ format: true }, function (err, xml) {

      if (err) {
        return console.error('could not save diagram', err);
      }

      alert('Diagram exported. Check the developer tools!');

      console.log('DIAGRAM', xml);
    });
  }
} 
