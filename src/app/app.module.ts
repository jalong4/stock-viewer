import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { HeaderComponent } from './components/header/header.component';
import { AccountComponent } from './components/account/account.component';
import { StocksComponent } from './components/stocks/stocks.component';
import { NewsComponent } from './components/news/news.component';
import { StockGroupComponent } from './components/stock-group/stock-group.component';
import { PortfolioSummaryComponent } from './components/portfolio-summary/portfolio-summary.component';
import { StockDetailsComponent } from './components/stock-details/stock-details.component';
import { HoldingsComponent } from './components/holdings/holdings.component';
import { SearchComponent } from './components/search/search.component';
import { StockTotalsComponent } from './components/stock-totals/stock-totals.component';
import { StockTableComponent } from './components/stock-table/stock-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [
    AppComponent,
    PortfolioComponent,
    AccountsComponent,
    HeaderComponent,
    AccountComponent,
    StocksComponent,
    NewsComponent,
    StockGroupComponent,
    PortfolioSummaryComponent,
    StockDetailsComponent,
    HoldingsComponent,
    SearchComponent,
    StockTotalsComponent,
    StockTableComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    AppRoutingModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatCardModule,
    MatListModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
