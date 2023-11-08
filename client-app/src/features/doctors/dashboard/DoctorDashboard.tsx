import { useEffect, useState } from "react";
import { Grid, Loader } from "semantic-ui-react";
import DoctorList from "./DoctorList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import DoctorFilters from "./DoctorFilters";
import { PaginationParams } from "../../../app/models/pagination";
import InfiniteScroll from "react-infinite-scroller";
import DoctorListItemPlaceholder from "./DoctorListItemPlaceholder";

function DoctorDashboard() {
    const { doctorStore } = useStore();
    const { doctorRegistry, loadDoctors, pagination, setPaginationParams } = doctorStore;
    const [loadNextPage, setLoadNextPage] = useState(false);

    function handleNextPage() {
        setLoadNextPage(true);
        setPaginationParams(new PaginationParams(pagination!.currentPage + 1))
        loadDoctors().then(() => setLoadNextPage(false));
    }

    useEffect(() => {
        if (doctorRegistry.size <= 1) loadDoctors();
    }, [loadDoctors, doctorRegistry.size])

    return (
        <Grid>
            <Grid.Column width='10'>
                {doctorStore.loadingInitial && !loadNextPage ? (
                    <>
                        <DoctorListItemPlaceholder />
                        <DoctorListItemPlaceholder />
                        <DoctorListItemPlaceholder />
                        <DoctorListItemPlaceholder />
                    </>
                ) : (
                    <InfiniteScroll initialLoad={false} pageStart={0} loadMore={handleNextPage}
                        hasMore={!loadNextPage && !!pagination && pagination.currentPage < pagination.totalPages}
                    >
                        <DoctorList />
                    </InfiniteScroll>
                )}

            </Grid.Column>
            <Grid.Column width='6'>
                <DoctorFilters />
            </Grid.Column>
            <Grid.Column width='10'>
                <Loader active={loadNextPage} />
            </Grid.Column>
        </Grid>
    );
}

export default observer(DoctorDashboard);