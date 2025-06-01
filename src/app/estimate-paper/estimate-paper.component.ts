import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-estimate-paper',
  templateUrl: './estimate-paper.component.html',
  styleUrls: ['./estimate-paper.component.scss']
})
export class EstimatePaperComponent {
  // estimate-paper.component.ts
@Input() index!: number;
@Input() isPrint!: boolean;

  //  quotations = {
  //   companyName: 'RISHI INTERIOR',
  //   proprietor: 'C. Sivaraman @ Shiva',
  //   city: 'Maharajapuram',
  //   address: 'Kottaram, Kanyakumari, DIST - 629703',
  //   mobile: '9597036274',
  //   works: [
  //     { sno: 1, description: '', sqft: 3.25, rate: 3900 },
  //     { sno: 2, description: '1.5 x 7', sqft: 10.5, rate: 12600 },
  //     { sno: 3, description: 'KITCHEN PANELING (SQ 550) 7 x 1', sqft: 7, rate: 3850 },
  //     { sno: 4, description: '18 x 1', sqft: 18, rate: 9900 },
  //     { sno: 5, description: 'KITCHEN TABLE UNDER PANELING (SQ 300) 4.5 x 3', sqft: 13.5, rate: 4050 },
  //     { sno: 6, description: 'BED ROOM TOP BOX BOOK SHELF (SQ 1100) 4 x 1.25', sqft: 5, rate: 5500 },
  //     { sno: 7, description: 'HOLDING TABLE (SQ 350) 4 x 1.75', sqft: 7, rate: 2450 },
  //     { sno: 8, description: 'TOP WALKING BED ROOM LAPHT (SQ 700) 11 x 3.25', sqft: 35.75, rate: 25025 },
  //     { sno: 9, description: 'TOP WALKING BED ROOM COMPUTER TABLE BOX (1200)', sqft: 17.5, rate: 21000 },
  //     { sno: 10, description: 'COMPUTER TABLE MIRROR PANELING (SQ 350) 5 x 7', sqft: 35, rate: 12250 }
  //   ],
  //   oldTotal: 781994,
  //   total: 100525,
  //   subTotal: 882519
  // };

quotation: any = {
  companyName: 'RISHI INTERIOR',
    proprietor: 'C. Sivaraman @ Shiva',
    city: 'Maharajapuram',
    address: 'Kottaram, Kanyakumari, DIST - 629703',
    mobile: '9597036274 | 9487716274',
    works: [],
    total: 0,
    oldTotal: 0,
    subTotal: 0,
    customerName: '',
    cus_mobile: '',
    date: ''
  };
  

// columnDefs: ColDef[] = [
//     { headerName: 'S NO:', field: 'sno', width: 100 },
//     {
//       headerName: 'DESCRIPTION OF WORK',
//       field: 'description',
//       editable: true,
//       width: 300
//     },
//     {
//       headerName: 'TOT SQ FT',
//       field: 'sqft',
//       editable: true,
//       width: 150,
//       valueParser: (params) => Number(params.newValue),
//       onCellValueChanged: () => this.recalculate()
//     },
//     {
//       headerName: 'RATE',
//       field: 'rate',
//       editable: true,
//       width: 150,
//       valueParser: (params) => Number(params.newValue),
//       onCellValueChanged: () => this.recalculate()
//     },
//     {
//       headerName: 'AMOUNT',
//       valueGetter: (params) => params.data.sqft * params.data.rate,
//       width: 150,
//       valueFormatter: (params) => params.value.toFixed(2)
//     }
//   ];


  rowData = this.quotation.works;

  numberParser(params: any) {
    return Number(params.newValue);
  }
  constructor(private http: HttpClient) {
    this.quotation.works = Array.from({ length: 15 }, (_, i) => ({
    sno: i + 1,
    description: '',
    sqft: null,
    rate: null
  }));
  }

  ngOnInit() {
    this.http.get('/api/quotation').subscribe((data: any) => {
      if (data && Object.keys(data).length > 0) {
        this.quotation = data;
        this.recalculate();
      }
    });

    console.log("ispring", this.isPrint);
    
  }

  recalculate() {
  let total = 0;
  let oldTotal = 0;

  this.quotation.works.forEach((item: { length: any; breadth: any; rate: any; totalSqFt: number; amount: number; }) => {
    const length = Number(item.length) || 0;
    const breadth = Number(item.breadth) || 0;
    const rate = Number(item.rate) || 0;

    const area = length * breadth;
    const amount = area * rate;

    item.totalSqFt = area;    // optional: store for reuse if needed
    item.amount = amount;     // optional

    total += amount;
    oldTotal += area;
  });

  this.quotation.total = total;
  this.quotation.oldTotal = oldTotal;
  this.quotation.subTotal = total; // or modify as per business logic
}


  // recalculate() {
  //   let total = 0;
  //   for (const item of this.quotation.works) {
  //     const amount = item.sqft * item.rate;
  //     if (!isNaN(amount)) total += amount;
  //   }
  //   this.quotation.total = total;
  //   this.quotation.subTotal = this.quotation.oldTotal + this.quotation.total;
  // }

  saveQuotation() {
    this.http.post('/api/quotation', this.quotation).subscribe(() => {
      alert('Quotation saved successfully!');
    });
  }
}
