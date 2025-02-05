import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { DeleteConfirmationDialog } from '../../app.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../../services/admin.service';


@Component({
  selector: 'app-juristic-credit-card',
  templateUrl: './juristic-credit-card.component.html',
  styleUrl: './juristic-credit-card.component.scss'
})
export class JuristicCreditCardComponent {

   // List of products (Juristic persons)
   products: any[] = [];
   searchQuery: string = '';
   filteredProducts: any[] = [];
   showForm: boolean = false;
   personalForm!: FormGroup;
   proffesionalInfo!: FormGroup;
   KYCDocuments!: FormGroup;
   ingredient: any;
   submitted: boolean = false;
   proffesionalInfo_submitted: boolean = false;
   KYCDocuments_submitted: boolean = false;
   activeIndex: number = 0;
   fieldsetDisabled: boolean = true;
   selectedCustomer: any;
   termsAgreed: boolean = false;
   creditCard !:FormGroup
   card_submitted:Boolean = false
   customer_id :any

 
   constructor(
     private router: Router,
     private adminService: AdminService,
     private fb: FormBuilder,
     private confirmationService: ConfirmationService,
     private toastr: ToastrService,
     private modalService: NgbModal,
     private http: HttpClient
   ) {}
 
   ngOnInit() {
     this.getCustomerData();
   }
 
   initValidators() {
     this.personalForm = this.fb.group({
       fullName: ['', Validators.required],
       email: ['', [Validators.required, Validators.email]],
       profilePhoto: ['', Validators.required],
       mobileNumber: ['', Validators.required],
       dateOfBirth: ['', Validators.required],
       streetAddress: ['', Validators.required],
       streetAddress2: [''],
       city: ['', Validators.required],
       state: ['', Validators.required],
       postalCode: ['', Validators.required],
     });
 
     this.proffesionalInfo = this.fb.group({
       companyName: ['', Validators.required],
       industryType: ['', Validators.required],
       designation: ['', Validators.required],
       incomePerMonth: ['', Validators.required],
     });
 
     this.KYCDocuments = this.fb.group({
       cardNo: ['', Validators.required],
       citizen_document: ['', Validators.required],
       passport: ['', Validators.required],
       passport_upload: ['', Validators.required],
       household_registration: ['', Validators.required],
       registration_document: ['', Validators.required],
       government_issued: ['', Validators.required],
       government_issued_doc: ['', Validators.required],
       idNo: ['', Validators.required],
       bank_statement_doc: ['', Validators.required],
     });
     this.creditCard = this.fb.group({
      annualIncome: ['', Validators.required], // Added creditCard group
      creditLimit: ['', Validators.required],
      creditCardPurpose: ['', Validators.required],
    });
   }
 
   getCustomerData() {
     this.products = [];
     this.filteredProducts = [];
     this.adminService.get('/juristicPerDet').subscribe((res) => {
       console.log('customrt', res);
 
       if (res.dataStatus) {
         this.products = res.result;
         this.filteredProducts = this.products;
       } else {
         this.toastr.error(res.message, 'Error');
       }
     });
   }
 
   filterProducts() {
     const query = this.searchQuery.trim().toLowerCase();
 
     if (query) {
       this.filteredProducts = this.products.filter((product) => {
         const productString = Object.values(product)
           .filter((val) => val != null)
           .map((val) => val.toString())
           .join(' ');
         return productString.toLowerCase().includes(query);
       });
     } else {
       this.filteredProducts = [...this.products];
     }
   }
 
   openFilterDialog(): void {
     console.log('Filter button clicked');
   }
 
   openAddJuristicPersonDialog(customer_id:any) {
     this.selectedCustomer = {};
     this.initValidators();
     this.showForm = true;
     this.customer_id = customer_id
   }
 
   backToList() {
     this.showForm = false;
     this.getCustomerData();
     this.card_submitted = false;
     this.KYCDocuments_submitted = false;
   }
 
   editJuristicPerson(product: any): void {
     console.log('Edit New Customer:', product);
     this.selectedCustomer = product;
     this.initValidators();
     this.personalForm.patchValue(product);
     this.proffesionalInfo.patchValue(product);
     this.KYCDocuments.patchValue(product);
     this.showForm = true;
   }
 
   deleteJuristicPerson(product: any): void {
     console.log('Delete New Customer:', product);
   }
 
   onSaveAndNext() {
     if (this.selectedCustomer?.id) {
       this.submitForm();
     }
 
     if (this.activeIndex === 0) {
       this.card_submitted = true;
       if (this.creditCard.valid) {
         this.activeIndex = 1;
         this.openTermsModal()
       } else {
         this.creditCard.markAllAsTouched();
       }
     }
   }
 
   goToPreviousTab(): void {
     this.activeIndex--;
   }
 
  //  submitForm() {
  //    let apiUrl = '/juristicPerUpt';
  //    let data = {
  //      records: {
  //        id: this.selectedCustomer ? this.selectedCustomer.id : '',
  //        fullName: this.personalForm.value.fullName,
  //        email: this.personalForm.value.email,
  //        gender: this.personalForm.value.gender,
  //        mobileNumber: this.personalForm.value.mobileNumber,
  //        dateOfBirth: this.personalForm.value.dateOfBirth,
  //        streetAddress: this.personalForm.value.streetAddress,
  //        streetAddress2: this.personalForm.value.streetAddress2,
  //        city: this.personalForm.value.city,
  //        state: this.personalForm.value.state,
  //        postalCode: this.personalForm.value.postalCode,
  //        profilePhoto: this.personalForm.value.profilePhoto,
  //        companyName: this.proffesionalInfo.value.companyName,
  //        industryType: this.proffesionalInfo.value.industryType,
  //        designation: this.proffesionalInfo.value.designation,
  //        incomePerMonth: this.proffesionalInfo.value.incomePerMonth,
  //        cardNo: this.KYCDocuments.value.cardNo,
  //        citizen_document: this.KYCDocuments.value.citizen_document,
  //        passport: this.KYCDocuments.value.passport,
  //        passport_upload: this.KYCDocuments.value.passport_upload,
  //        household_registration: this.KYCDocuments.value.household_registration,
  //        registration_document: this.KYCDocuments.value.registration_document,
  //        government_issued: this.KYCDocuments.value.government_issued,
  //        government_issued_doc: this.KYCDocuments.value.government_issued_doc,
  //        idNo: this.KYCDocuments.value.idNo,
  //        bank_statement_doc: this.KYCDocuments.value.bank_statement_doc,
  //      },
  //    };
  //    this.adminService.post(apiUrl, data).subscribe((res) => {
  //      this.showForm = false;
  //      this.submitted = false;
  //      this.proffesionalInfo_submitted = false;
  //      this.KYCDocuments_submitted = false;
  //      this.activeIndex = 0;
  //      if (res.dataStatus) {
  //        this.toastr.success(res.message, 'Success');
  //      } else {
  //        this.toastr.error(res.message, 'Error');
  //      }
  //    });
  //  }

  submitForm() {
    let apiUrl = '/creditCardReqUpt';
    let data = {
      records: {
        id: this.selectedCustomer ? this.selectedCustomer.id : '',
        // fullName: this.personalForm.value.fullName,
        // email: this.personalForm.value.email,
        // gender: this.personalForm.value.gender,
        // mobileNumber: this.personalForm.value.mobileNumber,
        // dateOfBirth: this.personalForm.value.dateOfBirth,
        // streetAddress: this.personalForm.value.streetAddress,
        // streetAddress2: this.personalForm.value.streetAddress2,
        // city: this.personalForm.value.city,
        // state: this.personalForm.value.state,
        // postalCode: this.personalForm.value.postalCode,
        // profilePhoto: this.personalForm.value.profilePhoto,
        // companyName: this.proffesionalInfo.value.companyName,
        // industryType: this.proffesionalInfo.value.industryType,
        // designation: this.proffesionalInfo.value.designation,
        // incomePerMonth: this.proffesionalInfo.value.incomePerMonth,
        // cardNo: this.KYCDocuments.value.cardNo,
        // citizen_document: this.KYCDocuments.value.citizen_document,
        // passport: this.KYCDocuments.value.passport,
        // passport_upload: this.KYCDocuments.value.passport_upload,
        // household_registration: this.KYCDocuments.value.household_registration,
        // registration_document: this.KYCDocuments.value.registration_document,
        // government_issued: this.KYCDocuments.value.government_issued,
        // government_issued_doc: this.KYCDocuments.value.government_issued_doc,
        // idNo: this.KYCDocuments.value.idNo,
        // bank_statement_doc: this.KYCDocuments.value.bank_statement_doc,
        annualIncome: this.creditCard.value.annualIncome,
        creditLimit: this.creditCard.value.creditLimit,
        creditCardPurpose: this.creditCard.value.creditCardPurpose,
        customer_id: this.customer_id,
        customer_type: 2
      },
    };
    this.adminService.post(apiUrl, data).subscribe((res) => {
      if (res.dataStatus) {
        this.toastr.success(res.message, 'Success');
        this.router.navigate(['request']);
      } else {
        this.toastr.error(res.message, 'Error');
      }
    });
  }
 
   openDeleteConfirmation(id: any) {
     const modalRef = this.modalService.open(DeleteConfirmationDialog);
     modalRef.componentInstance.id = id;
 
     modalRef.result.then(
       (result) => {
         if (result === 'yes') {
           this.deleteForm(id);
         }
       },
       (reason) => {
         // Handle dismiss
       }
     );
   }
 
 
   deleteForm(id: any) {
   let apiUrl = '/juristicPerUpt';
   let data = {
     "records": {
       "id": id,
       "status": "1"
     }
   };
 
   this.adminService.post(apiUrl, data).subscribe((res) => {
     if (res.dataStatus) {
       // Refresh the page after successful deletion
      // window.location.reload();
     } else {
       this.toastr.error(res.message, 'Error');
     }
   });
 }
 
 uploadFiles(event: Event, form: string, field: string) {
  const inputElement = event.target as HTMLInputElement;
  
  if (inputElement.files && inputElement.files[0]) {
    const selectedFile = inputElement.files[0];
    const fileName = selectedFile.name;
    
    // File size check (10 MB = 10485760 bytes)
    if (selectedFile.size <= 10485760) {
      const fileType = selectedFile.type;
      const allowedTypes = [
        'application/pdf',
        'image/jpeg',
        'image/jpg',
        'image/png',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel',
        'text/csv'
      ];
      
      if (allowedTypes.includes(fileType)) {
        const fileReader: FileReader = new FileReader();
        const timestamp = new Date().toISOString().replace(/[-:.T]/g, '');
        const filenameWithTimestamp = `${timestamp}_${fileName}`;
        
        fileReader.onload = () => {
          const binaryData = fileReader.result as ArrayBuffer;
          
          this.http
            .post('http://13.232.19.32/api/upload', binaryData, {
              headers: {
                'Content-Type': fileType,
                'X-Filename': filenameWithTimestamp,
              },
            })
            .subscribe(
              (response: any) => {
                if (response?.data?.Key) {
                  (this as any)[form].controls[field].setValue(response['data'].Key);
                  console.log('File uploaded successfully', response);
                } else {
                  console.error('Error: Response format is incorrect', response);
                }
              },
              (error) => {
                alert('Error uploading file');
                console.error('Error uploading file', error);
              }
            );
        };
        
        fileReader.readAsArrayBuffer(selectedFile);
      } else {
        alert('Please upload only PDF/Excel/CSV/Photo files.');
      }
    } else {
      alert("File size should not exceed 10MB.");
    }
  }
}

viewFiles(fileName: string) {
  const url = `https://bankingbackend.s3.ap-south-1.amazonaws.com/${fileName}`;
  window.open(url, '_blank');
}

removeDoc(form: string, field: string) {
  (this as any)[form].controls[field].setValue('');
}
 
   onTermsChange(event: any): void {
     this.termsAgreed = event.target.checked;
   }
 
   openTermsModal() {
     Swal.fire({
       html: `
 
         <h4 style="margin-bottom: 20px;">Terms and Conditions Governing BIZ iBanking Service (Effective as from June 1, 2022)</h4>
         <div class="terms-text" style="text-align: justify;">
           <h5 style="margin-bottom: 15px;">1. Definition</h5>
           <p style="margin-bottom: 10px;">1.1 “BIZ iBanking Service” or “Service” means the service provided by the Bank for the Applicant to perform any act or transactions via the internet system as specified herein.</p>
           <p style="margin-bottom: 10px;">1.2 “Applicant” means a juristic person or an individual who has signed as applicant in the Application for BIZ iBanking Service.</p>
           <p style="margin-bottom: 10px;">1.3 “Bank” means Bangkok Bank Public Company Limited.</p>
           <p style="margin-bottom: 10px;">1.4 “Company ID” means a code issued by the Bank for the Applicant, whether or not such Applicant is a juristic person or an individual, to access the Service.</p>
           <p style="margin-bottom: 10px;">1.5 “Super User” means an authorized person of the Applicant who has been assigned to utilize the Service in case the Applicant is a juristic person or the Applicant in case the Applicant is an individual.</p>
           <p style="margin-bottom: 10px;">1.6 “Super User ID” means a code issued by the Bank for the Super User to access the Service.</p>
           <p style="margin-bottom: 10px;">1.7 “PIN” means a code issued by the Bank for the first time access to the Service.</p>
           <p style="margin-bottom: 10px;">1.8 “Password” means a code designated by the Super User to access the Service.</p>
           <p style="margin-bottom: 10px;">1.9 “Token” means an electronic device used to generate Token Password.</p>
           <p style="margin-bottom: 10px;">1.10 “Token Password” means a code generated by the Token to access the Service.</p>
           <p style="margin-bottom: 10px;">1.11 “User” means a person assigned by the Super User to utilize the Service in the BIZ iBanking System.</p>
           <p style="margin-bottom: 10px;">1.12 “User ID” means a code designated by the Super User for the User to access the Service.</p>
           <p style="margin-bottom: 10px;">1.13 “System Administrator” means the administrator of a system that manages fund transfer services between banks, e.g., National ITMX Company Limited which is the administrator of PromptPay and SMART systems.</p>
           <p style="margin-bottom: 10px;">1.14 “PromptPay Service” means electronic transaction services with reference to identification number, tax identification number, mobile phone number, numerical number or any other identifier as may be later specified.</p>
           <p style="margin-bottom: 10px;">1.15 “Provisions” means the terms and conditions governing services provided by the Bank via the BIZ iBanking Service, namely, Provisions Governing Biz Payroll, Provisions Governing Biz Direct Credit (Batch), Provisions Governing Money Transfers to Accounts between Banks via System for Managing Automated Retail Funds Transfer (SMART), Provisions Governing Bahtnet Transfer Service (BAHTNET), Provisions Governing International Funds Transfer, Provisions Relating to Mutual Fund Service as well as any other terms and conditions governing or relating to other services to be further provided by the Bank.</p>
           <p style="margin-bottom: 10px;">1.16 “Manual” means BIZ iBanking Service manuals.</p>
   
           <h5 style="margin-bottom: 15px;">2. Service</h5>
           <p style="margin-bottom: 10px;">The Applicant may utilize the Service for the following activities and transactions...</p>
           <p style="margin-bottom: 10px;">(1) transferring funds from and into the Applicant’s accounts maintained with the Bank;</p>
           <p style="margin-bottom: 10px;">(2) transferring funds into the account of any other person maintained with the Bank;</p>
           <p style="margin-bottom: 10px;">(3) sending instructions to the Bank to debit an amount from the Applicant’s account for making Payroll, Direct Credit, transferring funds into an account of any person maintained at any other bank via SMART or BAHTNET;</p>
           <p style="margin-bottom: 10px;">(4) sending instructions to the Bank to debit an amount from the Applicant’s account for making payment of goods and services (Bill Payment);</p>
           <p style="margin-bottom: 10px;">(5) effecting international funds transfer;</p>
           <p style="margin-bottom: 10px;">(6) investing in and performing certain activities relating to mutual funds as notified by the Bank;</p>
           <p style="margin-bottom: 10px;">(7) viewing accounting items, stopping payment of cheques, disallowing withdrawal using passbook;</p>
           <p style="margin-bottom: 10px;">(8) viewing reports which are available under the Service;</p>
           <p style="margin-bottom: 10px;">(9) performing any other activities or transactions as may be notified by the Bank, or</p>
           <p style="margin-bottom: 10px;">2.2 for activities and transactions specified in 2.1 (1), (4), (6), (7), (8) and any other activities or transactions as may be notified by the Bank.</p>
 
           <h5 style="margin-top: 15px;">3. Utilization of Service</h5>
           <h6 style="margin-top: 10px;">The Applicant hereby acknowledges, accepts, and agrees that:</h6>
 
           <p style="margin-bottom: 10px;">3.1 The Company ID, Super User ID, and PIN will be sent to the Super User through any means deemed appropriate by the Bank. The Token shall be picked up by either the Super User or an authorized person at the branch where the Applicant submits the application or at any other place designated by the Bank.</p>
           <p style="margin-bottom: 10px;">
             Upon the Super User’s receipt of the Company ID, Super User ID, PIN, and Token delivered by the Bank, the Applicant shall be deemed to have received all such items.
           </p>
           <p style="margin-bottom: 10px;">
             3.2 The Applicant shall keep the Company ID, Super User ID, and PIN confidential and store the Token in a secure place.
           </p>
           <p style="margin-bottom: 10px;">
             3.3 The Super User may assign one or more persons as Users of the Service and prescribe their scope of authority in accordance with the procedures specified in the manuals.
           </p>
           <p style="margin-bottom: 10px;">
             3.4 If the Applicant (a juristic person) changes the individual acting as the Super User, the Applicant shall notify the Bank according to the procedures specified in the manuals.
           </p>
           <p style="margin-bottom: 10px;">
             3.5 Any activity or transaction performed by the Super User or User using the Company ID, Super User ID, or User ID, Password, and Token Password in accordance with the manuals shall be deemed to be performed by the Applicant and shall be binding on the Applicant without requiring any further documentation. The Applicant is responsible for all activities or transactions performed by such persons.
           </p>
           <p style="margin-bottom: 10px;">
             3.6 If the Bank offers additional types of activities or transactions, the Bank will notify the Applicant. The Super User is authorized to perform such additional activities, and the Applicant will be responsible for them.
           </p>
           <p style="margin-bottom: 10px;">
             3.7 The Applicant is responsible for verifying the correctness of any funds transfers or payments of goods and services to transferees registered with the PromptPay Service.
           </p>
           <p style="margin-bottom: 10px;">
             3.8 The Bank is entitled to reject a transfer request under the following circumstances:
           </p>
           <ul style="margin-bottom: 10px;">
             <li>The Bank suspects that the transfer may be linked to illegal activities, money laundering, terrorism financing, or non-compliance with applicable laws.</li>
             <li>The information provided by the Applicant is deemed untrue, inaccurate, or incomplete.</li>
             <li>The Bank has other reasonable grounds.</li>
           </ul>
           <p style="margin-bottom: 10px;">
             In the event of rejection, neither the Applicant nor the transferee may claim damages from the Bank. The Applicant is fully responsible for any claims from the transferee.
           </p>
           <p style="margin-bottom: 10px;">
             3.9 The Bank may not be able to provide the Service temporarily if there is a system failure, repair, or maintenance, or if a force majeure event occurs.
           </p>
           <p style="margin-bottom: 10px;">
             3.10 If the Applicant detects any error or has questions about account activities, they shall notify the Bank within 30 days. The Bank will investigate and respond within 7 days after the completion of the investigation.
           </p>
           <p style="margin-bottom: 10px;">
             3.11 Any communication sent by postal mail or email to the Applicant’s registered address or email shall be considered duly delivered. The Applicant is responsible for informing the Bank of any changes to the address or email.
           </p>
           <p style="margin-bottom: 10px;">
             3.12 The Applicant agrees to comply with the Terms and Conditions, Provisions, and Manuals provided by the Bank, which may be amended by the Bank as deemed appropriate. The Applicant agrees to be bound by the amended documents.
           </p>
           <p style="margin-bottom: 10px;">
             Any amendments to the Terms and Conditions, including fee adjustments, will be announced by the Bank at its office, branch, or website. Fee adjustments will be announced at least 30 days in advance.
           </p>
 
           <h5>4. Bank’s Responsibility</h5>
           <p>
             In the case where a loss or damage is incurred as a result of the Bank’s gross negligence or willful misconduct, the Applicant agrees that the Bank shall only be responsible for the loss or damage that will ordinarily be incurred and shall not be liable for any loss or damage resulting from special circumstances. The Applicant agrees that the Bank shall not be responsible for any loss or damage resulting from:
           </p>
           <ul>
             <li>4.1 The use by any person of Company ID, Super User ID, User ID, Password, and Token Password in accordance with the procedures specified by the Bank;</li>
             <li>4.2 Force majeure events or other circumstances beyond the Bank’s control, including failure of equipment or communication system, inoperative connection signals, computer viruses, or unlawful acts;</li>
             <li>4.3 Delay or error caused by, or deficiency of (i) computers or equipment of the Applicant or the Bank, (ii) System Administrator, (iii) Internet Service Provider, or (iv) other communication channels;</li>
             <li>4.4 The Applicant being unable to use the Service due to improvement or maintenance by the Bank;</li>
             <li>4.5 Delays caused by the process of the Service;</li>
             <li>4.6 The Bank’s reliance on the information sent by the Applicant through the Service;</li>
             <li>4.7 Non-compliance by the Applicant with these Terms and Conditions, the Provisions, or the Manuals.</li>
           </ul>
 
           <h5>5. Withholding of Income Tax in case the Applicant is a Juristic Person</h5>
           <p>
             In case the Applicant is a juristic person, the Applicant authorizes the Bank to deduct a withholding income tax from the fee payable hereunder and issue a certificate of tax deduction. The Bank will file such deductions and remit the withholding income tax on behalf of the Applicant. The Bank shall specify in the receipt for the fee that the Bank has made such a deduction on the Applicant’s behalf and will remit the withholding tax to the Revenue Department within the 7th day of the following month. The Applicant hereby agrees to be bound by all acts performed by the Bank within the scope of the said authorization.
           </p>
           <p>
             The Bank reserves the right not to perform as authorized above, provided that the Bank informs the Applicant in advance within a reasonable time.
           </p>
 
           <h5>6. Fees</h5>
           <p>
             The Applicant agrees to pay for the entrance fee, annual fee, and service fee in respect of security measures for the verification of the user’s identity at the rate specified by the Bank. The Applicant hereby agrees that the Bank may deduct any amount from the account specified in this Application to pay for said expenses and fees. In the case where the Bank is unable, for any reason, to debit from the said account, whether in whole or in part, the Bank shall be entitled to suspend the use of the Service until the fees and expenses are paid in full.
           </p>
           <p>
             As for the fees for funds transfer or various types of payment transactions, the Applicant agrees that the Bank may deduct such fees from the account specified by the Applicant for such transactions.
           </p>
 
           <h5>7. Personal Data</h5>
           <p>
             The Applicant acknowledges the purposes and details on the collection, use, and disclosure of personal data by the Bank as well as the rights of the data subject as stated in the Privacy Notice and the Letter Requesting Consent Relating to the Collection, Use, and Disclosure of Personal Data. The Applicant hereby certifies to the Bank that:
           </p>
           <ol>
             <li>(1) The Applicant has notified the details of the Privacy Notice of the Bank to the person whose personal data has been previously provided by the Applicant to the Bank, and such person has acknowledged the details stated in the Privacy Notice of the Bank, and</li>
             <li>(2) The Applicant has lawful rights to disclose any information of other persons whose personal data has been provided by the Applicant to the Bank.</li>
           </ol>
           <p>
             The Applicant accepts and agrees that the Bank has the rights to collect and use the information provided by the Applicant or information arising from the use of the Service under these Terms and Conditions, as well as other information related to the Service or obtained from other sources. The Bank has the right to send, transfer, or disclose such information to companies within the Bank's financial group, business partners, outsource service providers, agents, assignees of rights or obligations from the Bank, assignees of the Bank’s legal claims, advisors, other financial institutions, credit rating agencies, external auditors, or any other persons related to the business conduct of the Bank, both domestically and internationally, for purposes stated in the Privacy Notice of the Bank, including:
           </p>
           <ul>
             <li>7.1 Performances in accordance with these Terms and Conditions, the Provisions, and the Manuals;</li>
             <li>7.2 Communication, review, verification, or response to any inquiries or complaints related to the use of the Service;</li>
             <li>7.3 Analysis, process, management, or use of information incurred from the use of products or services to facilitate the Applicant, provide offers or privileges, and develop products and services;</li>
             <li>7.4 Performances relating to information technology;</li>
             <li>7.5 Compliance, risk management, and audit related to service provision including business management of the Bank, its affiliates, or business partners;</li>
             <li>7.6 Compliance with laws, regulations, or procedures prescribed by government or regulatory agencies, debt collection, or enforcement of legal rights.</li>
           </ul>
 
           <h5>8. Termination of Service</h5>
           <p>
             8.1 The Bank may terminate the Service at any time without notice if:
           </p>
           <ul>
             <li>(1) The Applicant does not use the Service within 1 year from receiving the Company ID and Super User ID; or</li>
             <li>(2) The Applicant has not accessed the Service for more than 1 year from the last access date.</li>
           </ul>
           <p>
             8.2 The Bank may terminate the Service or any activity or transaction offered via the Service at any time as the Bank deems appropriate.
           </p>
           <p>
             8.3 The Applicant may terminate the use of the Service at any time by giving five banking days' prior written notice to the Bank in accordance with the prescribed procedures. Such notice shall take effect at the end of the period, and all remaining instructions made through the Service that are to be effected after the end of the period shall be automatically canceled.
           </p>
 
           <div class="terms-and-conditions">
             <div class="form-check">
               <input class="form-check-input" type="checkbox" id="termsCheckbox">
               <label class="form-check-label" for="termsCheckbox">
                 I agree to the <a (click)="openTermsModal()">Terms and Conditions</a>
               </label>
             </div>
           </div>
 
       `,
       showCancelButton: false,
       confirmButtonColor: '#3085d6',
       confirmButtonText: 'Accept',
       cancelButtonText: 'Rejected',
       allowOutsideClick: false,
       allowEscapeKey: true,
       preConfirm: () => {
         const termsCheckbox = Swal.getPopup()?.querySelector('#termsCheckbox');
         if (!termsCheckbox || !(termsCheckbox as HTMLInputElement).checked) {
           Swal.showValidationMessage(
             'You need to agree to the Terms and Conditions'
           );
           return false;
         }
         return true;
       },
     }).then((result) => {
       if (result.isConfirmed) {
         // Handle the accepted logic here
         this.toastr.success('Terms & Conditions accepted', 'Success');
       }
     });
   }

   back(){
    this.showForm = false
   }


}
