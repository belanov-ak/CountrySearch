import './scss/index.scss'
import { AppComponent } from './components/appComponent/AppComponent'
import { Input } from './components/input/Input'
import { Output } from './components/output/Output'

const searchCountry = new AppComponent('#app', {
    components: [Input, Output]
})

searchCountry.render()