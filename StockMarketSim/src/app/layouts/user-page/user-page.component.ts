import { Component } from '@angular/core';

//TODO: ADD SELL FUNCTIONALITY, DISPLAY USER BALANCE, FIELDS FOR DISPLAYING DATA, DATABINDING TO DISPLAY DATA
@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent {

<<<<<<< HEAD
=======
              if (this.stockTotals.has(symbol)) {
                let oldQty = this.stockTotals.get(symbol);
                this.stockTotals.set(symbol, child.val().qty + oldQty);
              } else {
                this.stockTotals.set(symbol, child.val().qty);
              }
            });
          })
          .catch((error) => console.error(error));
        console.log(this.stockTotals);
      } else {
        this.router.navigate(['/']);
      }
    });
  }
>>>>>>> 162cd1a (Added todo-comments)
}
