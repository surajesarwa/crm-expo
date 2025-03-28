import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { TicketDetailComponent } from '../ticket-detail/ticket-detail.component';
import { TicketGenerationFormComponent } from '../ticket-generation-form/ticket-generation-form.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

export interface Communication {
  id: number;
  message: string;
  author: string;
  timestamp: Date;
  type: 'system' | 'agent' | 'user';
}

export interface Attachment {
  name: string;
  url: string;
}

export interface Ticket {
  id: number;
  title: string;
  category_id: number;
  priority_id: number;
  description: string;
  attachments: string | null;
  contact_email: string;
  contact_phone: string;
  expected_resolution_date: string;
  additional_notes: string;
  status_id: number;
  assigned_to_id: number | null;
  created_by_id: number;
  created_at: string;
  updated_at: string | null;
  deleted: boolean;
  statusName: string;
  categoryName: string;
  priorityName: string;
  assignedToName: string | null;
  createdByName: string;
}

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [
    CommonModule,
    // RouterLink,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    MatButtonToggleModule,
    TicketDetailComponent
  ],
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[] = [];
  filteredTickets: Ticket[] = [];
  searchControl = new FormControl('');
  statusFilter = new FormControl('');
  priorityFilter = new FormControl('');
  private searchSubject = new Subject<string>();
  isGridView: boolean = true;
  showDetails = false;
  selectedTicket: Ticket | null = null;

  statusColors: { [key: string]: string } = {
    'Open': 'accent',
    'In Progress': 'primary',
    'Resolved': 'primary',
    'Closed': 'warn',
    'Pending': 'accent'
  };

  priorityColors: { [key: string]: string } = {
    'High': 'warn',
    'Medium': 'accent',
    'Low': 'primary'
  };

  // Hardcoded status options
  statusOptions = [
    { value: '', label: 'All' },
    { value: 'Open', label: 'Open' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Resolved', label: 'Resolved' },
    { value: 'Closed', label: 'Closed' },
    { value: 'Pending', label: 'Pending' }
  ];

  // Hardcoded priority options
  priorityOptions = [
    { value: '', label: 'All' },
    { value: 'High', label: 'High' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Low', label: 'Low' }
  ];

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.applyFilters();
      });
  }

  ngOnInit(): void {
    // Initialize with hardcoded data
    this.initializeHardcodedData();

    // Set up search control subscription
    this.searchControl.valueChanges.subscribe(value => {
      this.searchSubject.next(value || '');
    });

    // Set up filter subscriptions
    this.statusFilter.valueChanges.subscribe(() => {
      this.applyFilters();
    });

    this.priorityFilter.valueChanges.subscribe(() => {
      this.applyFilters();
    });
  }

  private initializeHardcodedData(): void {
    // Hardcoded ticket data
    this.tickets = [
      {
        id: 1,
        title: 'System Login Issue',
        category_id: 1,
        priority_id: 1,
        description: 'Users unable to login to the system',
        attachments: null,
        contact_email: 'user1@example.com',
        contact_phone: '123-456-7890',
        expected_resolution_date: '2024-03-25',
        additional_notes: 'Affecting multiple users',
        status_id: 1,
        assigned_to_id: 1,
        created_by_id: 2,
        created_at: '2024-03-20T10:00:00',
        updated_at: null,
        deleted: false,
        statusName: 'Open',
        categoryName: 'Technical',
        priorityName: 'High',
        assignedToName: 'John Doe',
        createdByName: 'Admin'
      },
      {
        id: 2,
        title: 'Payment Processing Error',
        category_id: 2,
        priority_id: 2,
        description: 'Payment gateway integration issues',
        attachments: null,
        contact_email: 'user2@example.com',
        contact_phone: '098-765-4321',
        expected_resolution_date: '2024-03-26',
        additional_notes: 'Affecting checkout process',
        status_id: 2,
        assigned_to_id: 2,
        created_by_id: 1,
        created_at: '2024-03-19T15:30:00',
        updated_at: '2024-03-20T09:00:00',
        deleted: false,
        statusName: 'In Progress',
        categoryName: 'Billing',
        priorityName: 'Medium',
        assignedToName: 'Jane Smith',
        createdByName: 'Support'
      },
      {
        id: 3,
        title: 'Feature Request: Dark Mode',
        category_id: 3,
        priority_id: 3,
        description: 'Add dark mode support to the application',
        attachments: null,
        contact_email: 'user3@example.com',
        contact_phone: '555-555-5555',
        expected_resolution_date: '2024-04-01',
        additional_notes: 'User preference enhancement',
        status_id: 3,
        assigned_to_id: null,
        created_by_id: 3,
        created_at: '2024-03-18T11:20:00',
        updated_at: null,
        deleted: false,
        statusName: 'Pending',
        categoryName: 'Feature',
        priorityName: 'Low',
        assignedToName: null,
        createdByName: 'User'
      }
    ];

    this.filteredTickets = [...this.tickets];
  }

  applyFilters(): void {
    let filtered = [...this.tickets];

    // Apply search filter
    const searchTerm = this.searchControl.value?.toLowerCase() || '';
    if (searchTerm) {
      filtered = filtered.filter(ticket =>
        ticket.title.toLowerCase().includes(searchTerm) ||
        ticket.description.toLowerCase().includes(searchTerm) ||
        ticket.categoryName.toLowerCase().includes(searchTerm)
      );
    }

    // Apply status filter
    const statusFilter = this.statusFilter.value;
    if (statusFilter) {
      filtered = filtered.filter(ticket => ticket.statusName === statusFilter);
    }

    // Apply priority filter
    const priorityFilter = this.priorityFilter.value;
    if (priorityFilter) {
      filtered = filtered.filter(ticket => ticket.priorityName === priorityFilter);
    }

    this.filteredTickets = filtered;
  }

  getStatusColor(status: string): string {
    return this.statusColors[status] || 'primary';
  }

  getPriorityColor(priority: string): string {
    return this.priorityColors[priority] || 'primary';
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }

  openTicketDetails(ticket: Ticket): void {
    this.selectedTicket = ticket;
    this.showDetails = true;
  }

  closeDetails(): void {
    this.showDetails = false;
    this.selectedTicket = null;
  }

  openTicketcreation(ticket: Ticket | null): void {
    const dialogRef = this.dialog.open(TicketGenerationFormComponent, {
      width: '800px',
      height: '80vh',
      data: {
        ticket: ticket ? { ...ticket } : null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (ticket) {
          // Update existing ticket
          const index = this.tickets.findIndex(t => t.id === result.id);
          if (index !== -1) {
            this.tickets[index] = result;
            this.applyFilters();
          }
        } else {
          // Add new ticket
          this.tickets.push(result);
          this.applyFilters();
        }
      }
    });
  }

  deleteTicket(ticket: Ticket): void {
    if (confirm(`Are you sure you want to delete ticket #${ticket.id}?`)) {
      const index = this.tickets.findIndex(t => t.id === ticket.id);
      if (index !== -1) {
        this.tickets.splice(index, 1);
        this.applyFilters();
        this.snackBar.open('Ticket deleted successfully', 'Close', {
          duration: 3000
        });
      }
    }
  }

  toggleView(view: 'grid' | 'list'): void {
    this.isGridView = view === 'grid';
  }
}
