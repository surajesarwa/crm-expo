import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-create-followup-list',
  standalone: true,
  imports: [CommonModule,FormsModule,MatCardModule,MatButtonModule],
  templateUrl: './create-followup-list.component.html',
  styleUrl: './create-followup-list.component.scss'
})
export class CreateFollowupListComponent {
  leads: any[] = []; // Array to store leads
  selectedLead: any = null; // Variable to store the selected lead
  filteredLeads: any[] = []; // Array to store filtered leads
  searchQuery: string = ''; // Search query for filtering
  statusFilter: string = 'All'; // Status filter (default: 'All')

  
  constructor() {
    this.loadHardcodedLeads(); 
    this.filterLeads(); // Apply initial filter// Load hardcoded data
    this.selectedLead = this.filteredLeads[0]; // Set the first lead as selected by default
  }


  statusOptions: string[] = ['All', 'New', 'Contacted', 'Qualified'];

 

  loadHardcodedLeads(): void {
    this.leads = [
      {
        id: 'L001',
        name: 'Aarav Patel',
        email: 'aarav.patel@example.com',
        phone: '9123456780',
        leadSource: 'Website',
        leadType: 'Hot Lead',
        company: 'Company 1',
        status: 'New',
        createdDate: '2024-02-01',
        notes: 'Interested in product demo',
        imageUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=Aarav Patel',
      },
      {
        id: 'L002',
        name: 'Aanya Singh',
        email: 'aanya.singh@example.com',
        phone: '9123456781',
        leadSource: 'Referral',
        leadType: 'Cold Lead',
        company: 'Company 2',
        status: 'Contacted',
        createdDate: '2024-02-02',
        notes: 'Follow-up required',
        imageUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=Aanya Singh',
      },
      {
        id: 'L003',
        name: 'Advait Sharma',
        email: 'advait.sharma@example.com',
        phone: '9123456782',
        leadSource: 'Social Media',
        leadType: 'Warm Lead',
        company: 'Company 3',
        status: 'Qualified',
        createdDate: '2024-02-03',
        notes: 'Interested in product demo',
        imageUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=Advait Sharma',
      },
      {
        id: 'L004',
        name: 'Ananya Gupta',
        email: 'ananya.gupta@example.com',
        phone: '9123456783',
        leadSource: 'Email Campaign',
        leadType: 'Hot Lead',
        company: 'Company 4',
        status: 'New',
        createdDate: '2024-02-04',
        notes: 'Follow-up required',
        imageUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=Ananya Gupta',
      },
      {
        id: 'L005',
        name: 'Arjun Kumar',
        email: 'arjun.kumar@example.com',
        phone: '9123456784',
        leadSource: 'Event',
        leadType: 'Cold Lead',
        company: 'Company 5',
        status: 'Contacted',
        createdDate: '2024-02-05',
        notes: 'Interested in product demo',
        imageUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=Arjun Kumar',
      },
      {
        id: 'L006',
        name: 'Ishaan Reddy',
        email: 'ishaan.reddy@example.com',
        phone: '9123456785',
        leadSource: 'Website',
        leadType: 'Warm Lead',
        company: 'Company 6',
        status: 'Qualified',
        createdDate: '2024-02-06',
        notes: 'Follow-up required',
        imageUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=Ishaan Reddy',
      },
      {
        id: 'L007',
        name: 'Kavya Joshi',
        email: 'kavya.joshi@example.com',
        phone: '9123456786',
        leadSource: 'Referral',
        leadType: 'Hot Lead',
        company: 'Company 7',
        status: 'New',
        createdDate: '2024-02-07',
        notes: 'Interested in product demo',
        imageUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=Kavya Joshi',
      },
      {
        id: 'L008',
        name: 'Reyansh Mishra',
        email: 'reyansh.mishra@example.com',
        phone: '9123456787',
        leadSource: 'Social Media',
        leadType: 'Cold Lead',
        company: 'Company 8',
        status: 'Contacted',
        createdDate: '2024-02-08',
        notes: 'Follow-up required',
        imageUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=Reyansh Mishra',
      },
      {
        id: 'L009',
        name: 'Saanvi Desai',
        email: 'saanvi.desai@example.com',
        phone: '9123456788',
        leadSource: 'Email Campaign',
        leadType: 'Warm Lead',
        company: 'Company 9',
        status: 'Qualified',
        createdDate: '2024-02-09',
        notes: 'Interested in product demo',
        imageUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=Saanvi Desai',
      },
      {
        id: 'L010',
        name: 'Vihaan Choudhary',
        email: 'vihaan.choudhary@example.com',
        phone: '9123456789',
        leadSource: 'Event',
        leadType: 'Hot Lead',
        company: 'Company 10',
        status: 'New',
        createdDate: '2024-02-10',
        notes: 'Follow-up required',
        imageUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=Vihaan Choudhary',
      },
      { id: 'L011', name: 'Riya Mehta', email: 'riya.mehta@example.com', phone: '9123456790', leadSource: 'Website', leadType: 'Cold Lead', company: 'Company 11', status: 'Contacted', createdDate: '2024-02-11', notes: 'Requested brochure', imageUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=Riya Mehta' },
      { id: 'L012', name: 'Yash Verma', email: 'yash.verma@example.com', phone: '9123456791', leadSource: 'Referral', leadType: 'Warm Lead', company: 'Company 12', status: 'Qualified', createdDate: '2024-02-12', notes: 'Interested in partnership', imageUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=Yash Verma' },
      { id: 'L013', name: 'Sanya Kapoor', email: 'sanya.kapoor@example.com', phone: '9123456792', leadSource: 'Social Media', leadType: 'Hot Lead', company: 'Company 13', status: 'New', createdDate: '2024-02-13', notes: 'Wants product demo', imageUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=Sanya Kapoor' },
      { id: 'L014', name: 'Ayaan Malik', email: 'ayaan.malik@example.com', phone: '9123456793', leadSource: 'Event', leadType: 'Cold Lead', company: 'Company 14', status: 'Contacted', createdDate: '2024-02-14', notes: 'Asked for pricing details', imageUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=Ayaan Malik' },
      { id: 'L015', name: 'Ishita Bansal', email: 'ishita.bansal@example.com', phone: '9123456794', leadSource: 'Website', leadType: 'Warm Lead', company: 'Company 15', status: 'Qualified', createdDate: '2024-02-15', notes: 'Looking for long-term contract', imageUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=Ishita Bansal' },
      { id: 'L016', name: 'Kabir Sethi', email: 'kabir.sethi@example.com', phone: '9123456795', leadSource: 'Referral', leadType: 'Hot Lead', company: 'Company 16', status: 'New', createdDate: '2024-02-16', notes: 'Interested in bulk order', imageUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=Kabir Sethi' },
      { id: 'L017', name: 'Meera Nair', email: 'meera.nair@example.com', phone: '9123456796', leadSource: 'Social Media', leadType: 'Cold Lead', company: 'Company 17', status: 'Contacted', createdDate: '2024-02-17', notes: 'Requested price quote', imageUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=Meera Nair' },
      { id: 'L018', name: 'Rajesh Khanna', email: 'rajesh.khanna@example.com', phone: '9123456797', leadSource: 'Website', leadType: 'Warm Lead', company: 'Company 18', status: 'Qualified', createdDate: '2024-02-18', notes: 'Looking for demo session', imageUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=Rajesh Khanna' },
      { id: 'L019', name: 'Simran Chatterjee', email: 'simran.chatterjee@example.com', phone: '9123456798', leadSource: 'Email Campaign', leadType: 'Hot Lead', company: 'Company 19', status: 'New', createdDate: '2024-02-19', notes: 'Wants product samples', imageUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=Simran Chatterjee' },
      { id: 'L020', name: 'Devendra Yadav', email: 'devendra.yadav@example.com', phone: '9123456799', leadSource: 'Event', leadType: 'Cold Lead', company: 'Company 20', status: 'Contacted', createdDate: '2024-02-20', notes: 'Asked for company profile', imageUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=Devendra Yadav' },
      { id: 'L021', name: 'Neha Saxena', email: 'neha.saxena@example.com', phone: '9123456800', leadSource: 'Website', leadType: 'Warm Lead', company: 'Company 21', status: 'Qualified', createdDate: '2024-02-21', notes: 'Needs follow-up', imageUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=Neha Saxena' },
      { id: 'L022', name: 'Aryan Joshi', email: 'aryan.joshi@example.com', phone: '9123456801', leadSource: 'Referral', leadType: 'Hot Lead', company: 'Company 22', status: 'New', createdDate: '2024-02-22', notes: 'Interested in partnership', imageUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=Aryan Joshi' },
      { id: 'L023', name: 'Tara Iyer', email: 'tara.iyer@example.com', phone: '9123456802', leadSource: 'Social Media', leadType: 'Cold Lead', company: 'Company 23', status: 'Contacted', createdDate: '2024-02-23', notes: 'Requested free trial', imageUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=Tara Iyer' },
      { id: 'L024', name: 'Harsh Vardhan', email: 'harsh.vardhan@example.com', phone: '9123456803', leadSource: 'Email Campaign', leadType: 'Warm Lead', company: 'Company 24', status: 'Qualified', createdDate: '2024-02-24', notes: 'Looking for exclusive deal', imageUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=Harsh Vardhan' },
      { id: 'L025', name: 'Radhika Rao', email: 'radhika.rao@example.com', phone: '9123456804', leadSource: 'Event', leadType: 'Hot Lead', company: 'Company 25', status: 'New', createdDate: '2024-02-25', notes: 'Asked about warranty', imageUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=Radhika Rao' }
      // Add more leads as needed (up to 25)
    ];
  
    
  }
  
  // Function to handle lead selection
  onSelectLead(lead: any): void {
    this.selectedLead = lead;
  }

  filterLeads(): void {
    this.filteredLeads = this.leads.filter((lead) => {
      const matchesSearch = lead.name
        .toLowerCase()
        .includes(this.searchQuery.toLowerCase());
      const matchesStatus =
        this.statusFilter === 'All' || lead.status === this.statusFilter;
      return matchesSearch && matchesStatus;
    });
  }

  onSearchChange(): void {
    this.filterLeads();
  }

  // Function to handle status filter changes
  onStatusChange(): void {
    this.filterLeads();
  }

  openFollowUpModal(lead: any): void {
    console.log('Follow Up clicked for:', lead.name);
    // Add your logic to open a follow-up modal or perform an action
  }
}
