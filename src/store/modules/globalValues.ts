import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
@Module({ namespaced: true })
class GlobalValues extends VuexModule {
  public isLoading?: boolean = false
  @Mutation
  public updateLoading(newVal: boolean): void {
    this.isLoading = newVal
  }
  @Action
  public setLoading(newVal: boolean): void {
    this.context.commit('updateLoading', newVal)
  }
}
export default GlobalValues
