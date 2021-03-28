import { Component, OnInit, ViewChild,
  ChangeDetectionStrategy } from '@angular/core';
import { AccountService } from '../../services/account.service';
interface AccountType {
  value: string;
}
@Component({
  selector: 'account-insert',
  templateUrl: './account-insert.component.html',
  styleUrls: ['./account-insert.component.less'],
  providers: [AccountService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountInsertComponent {
  @ViewChild('input', { static: false }) inputfield: any;
  accounts: AccountType[] = [
    {value: 'Reer'},
    {value: 'Celi'},
    {value: 'Marge'},
    {value: 'Comptant'},
    {value: 'Cri'}
  ];
  Account: any;
  constructor(private dbService: AccountService) {
    this.reset();
  }

  reset() {
    this.Account = this.dbService.db.account.newDocument({


    });
}

  async submit() {

    try {
        await this.Account.save();
        this.reset();
    } catch (err) {
        alert('Error: Please check console');
        console.error('hero-insert.submit(): error:');
        throw err;
    }

    this.inputfield.nativeElement.focus();
}

}
