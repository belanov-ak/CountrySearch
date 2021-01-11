import './scss/index.scss'
import { AppComponent } from './components/appComponent/AppComponent'
import { Input } from './components/input/Input'
import { Output } from './components/output/Output'
import { Results } from './components/results/Results'
import { Favourites } from './components/favourites/Favourites'

const searchCountry = new AppComponent('#app', {
    components: [Input, Favourites, Output, Results]
})

searchCountry.render()