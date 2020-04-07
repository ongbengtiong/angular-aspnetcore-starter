import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Modeler, OriginalPropertiesProvider, PropertiesPanelModule, InjectionNames, OriginalPaletteProvider } from "../../models/bpmn-js/bpmn-js";
import { CustomPropsProvider } from '../../models/props-provider/CustomPropsProvider';
import { CustomPaletteProvider } from '../../models/props-provider/CustomPaletteProvider';
import { faFolderOpen, faSave } from '@fortawesome/free-solid-svg-icons';




const customModdle = {
  name: "customModdle",
  uri: "http://example.com/custom-moddle",
  prefix: "custom",
  xml: {
    tagAlias: "lowerCase"
  },
  associations: [],
  types: [
    {
      "name": "ExtUserTask",
      "extends": [
        "bpmn:UserTask"
      ],
      "properties": [
        {
          "name": "worklist",
          "isAttr": true,
          "type": "String"
        }
      ]
    },
  ]
};



@Component({
  selector: 'app-bpmn-modeler',
  templateUrl: './bpmn-modeler.component.html',
})
export class BpmnModelerComponent implements OnInit {
  title = 'Angular/BPMN';
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
      additionalModules: [
        PropertiesPanelModule,

        // Re-use original bpmn-properties-module, see CustomPropsProvider
        { [InjectionNames.bpmnPropertiesProvider]: ['type', OriginalPropertiesProvider.propertiesProvider[1]] },
        { [InjectionNames.propertiesProvider]: ['type', CustomPropsProvider] },

        // Re-use original palette, see CustomPaletteProvider
        { [InjectionNames.originalPaletteProvider]: ['type', OriginalPaletteProvider] },
        { [InjectionNames.paletteProvider]: ['type', CustomPaletteProvider] },
      ],
      propertiesPanel: {
        parent: '#properties'
      },
      moddleExtension: {
        custom: customModdle
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
    const url = '/assets/bpmn/initial.bpmn';
    this.loadFile(url);
  }
  load(): void {
    const url = '/assets/bpmn/sample.bpmn';
    this.loadFile(url);
  }
  loadFile(url): void {

    this.http.get(url, {
      headers: { observe: 'response' }, responseType: 'text'
    }).subscribe(
      (x: any) => {
        console.log('Fetched XML, now importing: ', x);
        this.modeler.importXML(x, this.handleError);
      },
      this.handleError
    );
  }

  save(): void {
    // this.modeler.saveXML((err: any, xml: any) => console.log('Result of saving XML: ', err, xml));

    this.modeler.saveXML({ format: true }, function (err, xml) {

      if (err) {
        return console.error('could not save diagram', err);
      }

      alert('Diagram exported. Check the developer tools!');

      console.log('DIAGRAM', xml);
    });
  } 
}
