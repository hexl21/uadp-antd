import * as service from '../service/Service';

export default {
  namespace:'role',
  state: {
    roleProps: {
      isNew: true,
      editData: {},
      visible: false,
      loading: false,
      orgType: [],
    },
    moduleProps: {
      isSet: true,
      selectedModules: [],
      visible: false,
      moduleTree: [],
    },
    dataSource: [],
    orgTreeData: [],
  },
  reducers: {
    /*初始化加载机构树*/
    initTreeData: function (state, params, put, dispatch) {
      service.initOrgTree(params, put, dispatch);
    },
    /*初始化机构类型*/
    initOrgType: function (state, params, put) {
      service.initOrgType(state, put);
    },
    /*选中组织机构树*/
    onOrgTreeSelect: function (state, params, put) {
      service.queryRoleList(params.selectTreeKey, put);
    },
    /*刷新角色列表*/
    refreshRoleList: function (state, params, put) {
      service.queryRoleList(state.selectTreeKey, put);
    },
    /*打开角色弹出框*/
    openRoleModal: function (state, params) {
      let roleProps = state.roleProps;
      Object.assign(roleProps, params, {visible: true});
      return {roleProps: roleProps};
    },
    /*关闭角色弹出框*/
    closeRoleModal: function (state, params) {
      let roleProps = state.roleProps;
      Object.assign(roleProps, {visible: false});
      return {roleProps: roleProps};
    },
    /*装载功能模块树*/
    initModuleTree: function (state, params, put) {
      service.queryModuleTree(state, put);
    },
    /*打开功能模块弹出框*/
    openModuleModal: function (state, params, put) {
      service.queryRoleModuleList(state, params, put);
    },
    /*关闭功能模块弹出框*/
    closeModuleModal: function (state, params) {
      let moduleProps = state.moduleProps;
      Object.assign(moduleProps, {visible: false});
      return {moduleProps: moduleProps};
    },
    /*保存角色*/
    saveRole: function (state, params, put, dispatch) {
      service.saveRole(state, params, put, dispatch);
    },
    deleteRole: function (state, params, put, dispatch) {
      service.deleteRole(state, params, put, dispatch);
    },
    checkModules: function (state, params, put, dispatch) {
      let moduleProps = state.moduleProps;
      Object.assign(moduleProps, {selectedModules: service.filterTree(params, moduleProps.moduleTree)});
      return {moduleProps: moduleProps};
    },
    updateRoleModule(state, params, put, dispatch) {
      service.updateRoleModule(state, params, put, dispatch)
    },
    isGlobalChange(state, params, put, dispatch) {
      let roleProps = state.roleProps;
      roleProps.editData.isGlobal = params;
      return {roleProps: roleProps};
    },
    getCurrentUserType(state, params, put, dispatch) {
      service.getCurrentUserType(state, params, put, dispatch);
    }

  }
}