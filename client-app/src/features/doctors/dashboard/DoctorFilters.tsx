import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Divider, Dropdown,  Header,  Menu } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { categoryOptions, cityOptions, orderOptions } from "../../../app/common/options";

function DoctorFilters() {
    const { doctorStore: { filterType, setFilterType, setFilterValue, setOrderBy, orderByRating } } = useStore();
    const [filterTypeChanged, setFilterTypeChanged] = useState(false);

    return (
        <>
            <Dropdown selection defaultValue={orderByRating} options={orderOptions} onChange={(e, d) => setOrderBy(d.value as boolean)} />
            <Divider horizontal />
            <Menu vertical size='large' style={{ width: '100%', marginTop: 25 }}>
                <Header icon='filter' attached color='teal' content='Filters' />
                <Menu.Item
                    content='All doctors'
                    active={filterType === "all"}
                    onClick={() => { setFilterType("all"); setFilterTypeChanged(false); }}
                />
                <Menu.Item
                    content="City"
                    active={filterType === "city"}
                    onClick={() => { setFilterType("city"); setFilterTypeChanged(true); }}
                />
                <Menu.Item
                    content="Category"
                    active={filterType === "category"}
                    onClick={() => { setFilterType("category"); setFilterTypeChanged(true); }}
                />
            </Menu>
            {filterTypeChanged && (
                <>
                    <Divider horizontal />
                    {filterType === "category" && (
                        <Dropdown selection selectOnBlur={false} placeholder="Choose category" options={categoryOptions} 
                        onChange={(e, d) => setFilterValue(d.value as string)} />
                    )}
                    {filterType === "city" && (
                        <Dropdown selection selectOnBlur={false} placeholder="Choose city" options={cityOptions} 
                        onChange={(e, d) => setFilterValue(d.value as string)} />
                    )}        
                </>
            )}

        </>

    );
}

export default observer(DoctorFilters);