import React from "react";
import { Components  } from "@reactioncommerce/reaction-components";
import SearchModal from "/imports/plugins/included/ui-search/lib/components/searchModal";
import { IconButton, SortableTableLegacy } from "@reactioncommerce/reaction-ui";
import ProductGridContainer from "/imports/plugins/included/product-variant/containers/productGridContainer";
import { accountsTable } from "/imports/plugins/included/ui-search/lib/helpers";


class CustomSearchModal extends SearchModal {
  renderSortAndFilter() {
    const priceOptions = [
      { value: "all", label: "All" },
      { value: "0-4000", label: "below \u20a6 4000" },
      { value: "4000-10000", label: "\u20a6 4000 - \u20a6 10000" },
      { value: "10000-100000", label: "\u20a6 10000 - \u20a6 100000" },
      { value: "100000-500000", label: "\u20a6 100000 - \u20a6 500000" },
      { value: "500000", label: "\u20a6 500000 - above" }
    ];
    const sortOptions = [
      { property: "all", value: JSON.stringify({ property: "all" }), label: "Default" },
      { property: "price", value: JSON.stringify({ property: "price" }), label: "Price: Lowest to Highest" },
      { property: "price", value: JSON.stringify({ property: "price", ascending: false }), label: "Price: Highest to Lowest" },
      { property: "createdAt", value: JSON.stringify({ property: "createdAt", ascending: false }), label: "Date: Newest to Oldest" },
      { property: "createdAt", value: JSON.stringify({ property: "createdAt" }), label: "Date: Oldest to Newest" },
      { property: "vendor", value: JSON.stringify({ property: "vendor" }), label: "Vendor: Ascending" },
      { property: "vendor", value: JSON.stringify({ property: "vendor", ascending: false }), label: "Vendor: Descending" }
    ];
    const availableSortOptions = (compareRow, currentRow) => {
      if (currentRow === 0 && this.props.sorters[1].property === "all") { return sortOptions; }
      const available = sortOptions.filter(option => option.property !== this.props.sorters[compareRow].property);
      if (currentRow === 0 && available[0].property !== "all") {available.push(sortOptions[0]);}
      return available;
    };
    return (
      <div className="sort-filter">
        <div className="filter-box">

          <span className="filter-sort">
            <Components.Select
              clearable={false}
              label="Sort By"
              name="first"
              options={availableSortOptions(1, 0)}
              onChange={value => this.props.handleSort(value, 0)}
              value={JSON.stringify(this.props.sorters[0])}
            />
          </span>

          <span className="filter-sort" style={{ width: "20%" }}>

            { this.props.sorters[0].property !== "all"
          &&
          <Components.Select
            clearable={false}
            label="Further Sort By"
            name="second"
            options={availableSortOptions(0, 1)}
            onChange={value => this.props.handleSort(value, 1)}
            value={JSON.stringify(this.props.sorters[1])}
          />
            }
          </span>
          <span className="filter-sort" id="price-filter-span" style={{ width: "20%" }}>
            <Components.Select
              clearable={false}
              label="Filter By"
              name="priceFilter"
              ref="priceFilterInput"
              options={priceOptions}
              onChange={this.props.handlePriceFilter}
              value={this.props.priceFilter}
            />
          </span>
        </div>
      </div>
    );
  }
  render() {
    return (
      <div>
        <div className="rui search-modal-close"><IconButton icon="fa fa-times" onClick={this.props.unmountMe} /></div>
        <div className="rui search-modal-header">
          {this.renderSearchInput()}
          {this.renderSearchTypeToggle()}
          {this.props.tags.length > 0 && this.renderProductSearchTags()}
        </div>
        {this.renderSortAndFilter()}
        <div className="rui search-modal-results-container">
          {this.props.products.length > 0 ?
            <ProductGridContainer
              products={this.props.products}
              unmountMe={this.props.unmountMe}
              isSearch={true}
            /> :
            <h2 className="text-center"> No Matching Products Found</h2>

          }
          {this.props.accounts.length > 0 &&
            <div className="data-table">
              <div className="table-responsive">
                <SortableTableLegacy
                  data={this.props.accounts}
                  columns={accountsTable()}
                  onRowClick={this.props.handleAccountClick}
                />
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}
export default CustomSearchModal;

