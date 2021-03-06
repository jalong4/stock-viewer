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
import { HeaderComponent } from './components/header/header.component';
import { AccountComponent } from './components/account/account.component';
import { NewsComponent } from './components/news/news.component';
import { StockGroupComponent } from './components/stock-group/stock-group.component';
import { HoldingsComponent } from './components/holdings/holdings.component';
import { SearchComponent } from './components/search/search.component';
import { StockTableComponent } from './components/stock-table/stock-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { WatchListComponent } from './components/watch-list/watch-list.component';


@NgModule({
    declarations: [
        AppComponent,
        PortfolioComponent,
        HeaderComponent,
        AccountComponent,
        NewsComponent,
        StockGroupComponent,
        HoldingsComponent,
        SearchComponent,
        StockTableComponent,
        WatchListComponent
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
export class AppModule {}