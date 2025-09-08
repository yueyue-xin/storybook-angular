import { Component, Input, OnInit } from '@angular/core';
import { ClarityModule, ClrDatagridComparatorInterface } from '@clr/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface ModelData {
  name: string;
  defaultContext: string;
  maxMode: string;
  recommendation: string[];
}

const modelsData: ModelData[] = [
  { 
    name: 'Claude 3 Opus', 
    defaultContext: '60k', 
    maxMode: '-', 
    recommendation: ['Long-form writing', 'Reasoning'] 
  },
  { 
    name: 'Claude 3.5 Haiku', 
    defaultContext: '60k', 
    maxMode: '-', 
    recommendation: ['Fast response', 'Chat'] 
  },
  { 
    name: 'Claude 3.5 Sonnet', 
    defaultContext: '200k', 
    maxMode: '-', 
    recommendation: ['Code generation', 'Data analysis'] 
  },
  { 
    name: 'Claude 3.7 Sonnet', 
    defaultContext: '200k', 
    maxMode: '-', 
    recommendation: ['Enterprise apps', 'Long context'] 
  },
  { 
    name: 'Claude 4 Opus', 
    defaultContext: '-', 
    maxMode: '200k', 
    recommendation: ['Knowledge Q&A', 'Decision support'] 
  },
  { 
    name: 'Claude 4 Sonnet', 
    defaultContext: '200k', 
    maxMode: '-', 
    recommendation: ['Technical docs'] 
  },
  { 
    name: 'Claude 4 Sonnet 1M', 
    defaultContext: '-', 
    maxMode: '1M', 
    recommendation: ['Ultra-long docs', 'Large context'] 
  },
  { 
    name: 'Claude 4.1 Opus', 
    defaultContext: '-', 
    maxMode: '200k', 
    recommendation: ['Research', 'Legal analysis'] 
  },
  { 
    name: 'Cursor Small', 
    defaultContext: '60k', 
    maxMode: '-', 
    recommendation: ['Code completion', 'IDE integration'] 
  },
  { 
    name: 'Deepseek R1', 
    defaultContext: '60k', 
    maxMode: '-', 
    recommendation: ['Light reasoning', 'Education'] 
  },
  { 
    name: 'Deepseek R1 (05/28)', 
    defaultContext: '60k', 
    maxMode: '-', 
    recommendation: ['Beta testing'] 
  },
  { 
    name: 'Deepseek V3', 
    defaultContext: '60k', 
    maxMode: '-', 
    recommendation: ['Efficient reasoning', 'Dialogue'] 
  },
  { 
    name: 'Deepseek V3.1', 
    defaultContext: '60k', 
    maxMode: '-', 
    recommendation: ['Research support', 'Modeling'] 
  },
  { 
    name: 'Gemini 2.0 Pro (exp)', 
    defaultContext: '60k', 
    maxMode: '-', 
    recommendation: ['Developer testing', 'Experimental'] 
  },
  { 
    name: 'Gemini 2.5 Flash', 
    defaultContext: '-', 
    maxMode: '1M', 
    recommendation: ['Real-time apps', 'Low latency'] 
  },
  { 
    name: 'Gemini 2.5 Pro', 
    defaultContext: '200k', 
    maxMode: '1M', 
    recommendation: ['Enterprise knowledge', 'Multimodal'] 
  },
];

@Component({
  selector: 'lib-complex-data-grid',
  standalone: true,
  imports: [ClarityModule, CommonModule, FormsModule],
  templateUrl: './complex-data-grid.component.html',
  styleUrl: './complex-data-grid.component.scss'
})
export class ComplexDataGridComponent implements OnInit {
  @Input() pageSize: number = 10;
  @Input() data: ModelData[] = [];

  filteredData: ModelData[] = [];
  selectedModels: ModelData[] = [];
  isLoading: boolean = true;

  defaultContextComparator: ClrDatagridComparatorInterface<ModelData> = {
    compare: (a: ModelData, b: ModelData) => {
      const getContextValue = (context: string): number => {
        if (context === '-') return 0;
        const numStr = context.replace(/[^0-9]/g, '');
        const multiplier = context.includes('M') ? 1000 : 1;
        return parseInt(numStr) * multiplier;
      };
      
      return getContextValue(a.defaultContext) - getContextValue(b.defaultContext);
    }
  };

  maxModeComparator: ClrDatagridComparatorInterface<ModelData> = {
    compare: (a: ModelData, b: ModelData) => {
      const getMaxModeValue = (maxMode: string): number => {
        if (maxMode === '-') return 0;
        const numStr = maxMode.replace(/[^0-9]/g, '');
        const multiplier = maxMode.includes('M') ? 1000 : 1;
        return parseInt(numStr) * multiplier;
      };
      
      return getMaxModeValue(a.maxMode) - getMaxModeValue(b.maxMode);
    }
  };

  ngOnInit() {
    // mock load 5 s 
    setTimeout(() => {
      if(!this.data?.length) {
        this.data = modelsData;
      }
      this.filteredData = this.data;
      this.isLoading = false;
    }, 5000);
  }
}