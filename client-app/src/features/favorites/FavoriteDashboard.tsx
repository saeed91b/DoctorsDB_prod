import { Divider, Grid, Header } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import FavoriteList from "./FavoriteList";
import LoadingComponent from "../../app/layout/LoadingComponent";

function FavoriteDashboard() {
    const { userStore: { getUser, userFavorites } } = useStore();
    const [loadingInitial, setLoadingInitial] = useState(false);

    useEffect(() => {
        setLoadingInitial(true);
        getUser().finally(() => setLoadingInitial(false));
    }, [getUser]);

    if (loadingInitial) return <LoadingComponent content="Loading favorites..." />

    return (
        <Grid>
            <Grid.Column width='12'>
                {(userFavorites.length === 0) ? (<h1>You don't have any favorites.</h1>) : (
                    <>
                        <Header color='red' size="large" dividing content="Your favorite doctors:" />
                        <Divider inverted horizontal />
                        <FavoriteList favorites={userFavorites} />
                    </>
                )
                }
            </Grid.Column>
        </Grid>
    );
}

export default observer(FavoriteDashboard);