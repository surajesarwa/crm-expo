import { Component, ViewChild } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BranchComponent } from '../branch/branch.component';
import { MatCardContent, MatCardHeader, MatCardModule } from '@angular/material/card';
import { CrmApiService } from '../../crm-api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-branchlist',
  standalone: true,
  imports: [FormsModule,MatTabsModule,MatButtonModule,MatIcon,ReactiveFormsModule,NgIf,FormsModule,MatInputModule,
     MatTableModule, MatDialogModule,MatPaginatorModule,BranchComponent, MatCardModule,MatFormFieldModule],
  templateUrl: './branchlist.component.html',
  styleUrls: ['./branchlist.component.scss']
})
export class BranchlistComponent {
  branch_data: any = {};
  @ViewChild(MatSort) set matSort(sort: MatSort){ this.dataSource.sort=sort;}
  branches: any = []
  filterText:any=''
  searchControl=new FormControl('')
  dataSource = new MatTableDataSource(this.branches);

  displayedColumns: string[] = ['srNo', 'branchName', 'address', 'city', 'pincode', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  filteredBranches: any;
  dialogRef: any;
  totalData: any;
  limit: any;
  totalPages: any;
  pageNumber: number = 1;
  nextPage: any;
  previousPage: any;
  pagination: any;
  selectedPageIndex: number = 1;
  selectedPageSize: number = 10;
  pageSizeOptions = 10
  c: any;
  loading:boolean=false
  y='';
  constructor(private api: CrmApiService,private dialog: MatDialog) { }

  ngOnInit() {
    this.branchget();
  }

 

  branchget() {
    this.api.post('api/allbranch/s=',{pagination:true}).subscribe((res: any) => {
      this.branches = res.data;
      this.filteredBranches = this.branches;
      this.pagination = res.pagination_data
      this.totalData = res.pagination_data.total_data;
      this.limit = res.pagination_data.limit;
      this.totalPages = res.pagination_data.total_pages;
      this.pageNumber = res.pagination_data.page_number;
      this.nextPage = res.pagination_data.next_page;
      this.previousPage = res.pagination_data.previous_page;
      this.dataSource = new MatTableDataSource(this.branches);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort
   
    })
  }

  deleteBranch(id: number) {
    // Implement delete functionality here
    console.log('Delete branch with ID:', id);
    this.branches = this.branches.filter((branch: any) => branch.id !== id);
  }

  applyPagination() {
    this.dataSource = new MatTableDataSource(this.branches);
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    
    this.filteredBranches = this.branches.filter((branch:any) =>
      branch.branchName.toLowerCase().includes(filterValue)
    );
  }

  editBranch(branchId: any): void {
    console.log('Editing branch with ID:', branchId);
   
   const dialogRef = this.dialog.open(BranchComponent, {
      width: '600px',
      data: { branchId: branchId }  // Pass the branch ID if needed
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      // Handle any actions after the dialog is closed
    });
  }
  onPageChange(event: any) {
    console.log( 'eventworking');
    
    this.limit = event.pageSize; // Update 'limit' based on selected page size
    this.pageNumber = event.pageIndex + 0;
    this.pageNumber++
    // this.pagination.page_number = this.pageNumber
   
    // this.branch_data.page_number = this.pageNumber
    // this.branch_data.limit = this.limit
    let d={
      limit:this.limit,
      "pagination":true,
      page_number:this.pageNumber,
      
    }
    this.api.post('api/allbranch/s='+this.y, d).subscribe((response: any) => {
     
      this.branches = new MatTableDataSource(response.data)
    })
  }
  search(e:any) {
    this.y=e
    this.api.post('api/allbranch/s='+e, this.branch_data).subscribe((response: any) => {
      //*console.log(response, 'salesssss');
      this.c = response.data
      this.branches = new MatTableDataSource(this.c)
      this.loading=false
      this.pagination = response.pagination_data
      this.totalData = response.pagination_data.total_data;
      this.limit = response.pagination_data.limit;
      this.totalPages = response.pagination_data.total_pages;
      this.pageNumber = response.pagination_data.page_number;
      this.nextPage = response.pagination_data.next_page;
      this.previousPage = response.pagination_data.previous_page;
    })
  }

  searchChange(event:any) {
    const val = event.target.value;
    //*console.log(event, "lll");
    if (val == '') {
      this.search('')
    }else{
    this.search(val);
    this.loading=true
    }
  }
  sea(event:any){
    const vallv= event
    this.search(vallv);
    this.loading=true
  }
  filter(a:any){
    if (a == '') {
      this.search('')
      this.loading=true
    }
  }
  clearFilter() {
    this.filterText = '';   
    this.search('')
  }
}
