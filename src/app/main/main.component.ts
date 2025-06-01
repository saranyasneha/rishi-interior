import { Component, ElementRef, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
 estimatePapers: number[] = [0]; // Initial one paper
isPrint: boolean = false;

  @ViewChild('pdfContent') pdfContent!: ElementRef;
  addEstimatePaper() {
    this.estimatePapers.push(this.estimatePapers.length); // Push a new ID (or just any unique number)
  }

  
  downloadPDF() {
    this.isPrint = true;
    const options = {
      margin:       0,
      filename:     'Estimate-Papers.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    const content = this.pdfContent.nativeElement;

    html2pdf().set(options).from(content).save();
     setInterval(() => {
      this.isPrint = false
     }, 3000)
  }
removeEstimatePaper(index: number): void {
  this.estimatePapers.splice(index, 1);
}

// generatePdf(index: number): void {
//   const elementId = `estimatePaper-${index}`;
//   const element = document.getElementById(elementId);

//   if (!element) {
//     console.error('Element not found:', elementId);
//     return;
//   }

//   html2canvas(element, { backgroundColor: '#ffffff' }).then(canvas => {
//     const imgData = canvas.toDataURL('image/png');
//     const pdf = new jsPDF('p', 'mm', 'a4');
//     const imgProps = pdf.getImageProperties(imgData);
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

//     pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//     pdf.save(`estimate-paper-${index + 1}.pdf`);
//   });
// }
// main.component.ts
// generatePdf(index: number) {
//   const element = document.getElementById('estimate-paper-' + index);
//   if (!element) {
//     console.error('Element not found: estimate-paper-' + index);
//     return;
//   }

//   import('html2pdf.js').then((html2pdf) => {
//     html2pdf.default()
//       .from(element)
//       .set({
//         margin: 1,
//         filename: `estimate-${index + 1}.pdf`,
//         image: { type: 'jpeg', quality: 0.98 },
//         html2canvas: { scale: 2 },
//         jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
//       })
//       .save();
//   });
// }




}
