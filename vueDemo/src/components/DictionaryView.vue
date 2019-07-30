<template>
    <section>
        <div class="table"> <!-- 页面表格begin -->
            <div class="crumbs"> <!-- 页面标题begin -->
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item><i class="el-icon-tickets"></i>字典管理</el-breadcrumb-item>
                </el-breadcrumb>
            </div> <!-- 页面标题end-->
            <div class="container"><!-- 页面内容区begin -->
                <div class="handle-box"> <!-- 搜索区begin -->
                    <!--工具条-->
                    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
                        <el-form :inline="true" :model="filters">
                            <el-form-item>
                                字典名： <el-input v-model="filters.dictionaryName"  placeholder="字典名" style="width:200px; heght:30px;" size="mini"></el-input>
                            </el-form-item>
                            <el-form-item>
                                字典类型：<el-input v-model="filters.dictionaryType"   placeholder="字典类型" style="width:200px; heght:30px;" size="mini"></el-input>
                            </el-form-item>
                            <el-form-item>
                                启用标记： <el-input v-model="filters.mark"  placeholder="启用标记" style="width:200px; heght:30px;" size="mini"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" icon="el-icon-search" @click="searchDic(filters.dictionaryName,filters.dictionaryType,filters.mark)" size="mini">搜索</el-button>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </div> <!-- 搜索区end -->
                <!--新增按钮-->
                <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleAdd" size="mini" round>新增</el-button>
                <el-button type="danger" icon="el-icon-delete" @click="mutiDel" size="mini" round>删除</el-button>
                <el-button type="primary" icon="el-icon-edit" @click="editDictionaryById({},selectList[0])" size="mini" round>修改</el-button>
                <el-button type="primary" icon="el-icon-upload" @click="uploadDictionary" size="mini" round>导入</el-button>
                <el-button type="primary" icon="el-icon-download" @click="exportDictionary" size="mini" round>导出</el-button>
                <template>
                    <!--表格数据及操作-->
                    <el-table :data="currentPageData" size="mini"  highlight-current-row border   class="el-tb-edit mgt20" ref="multipleTable" tooltip-effect="dark" v-loading="listLoading" @selection-change="selectChange">
                        <!--勾选框-->
                        <el-table-column type="selection" width="55" v-model="editRow">
                        </el-table-column>
                        <!--索引-->
                        <el-table-column type="index" :index="indexMethod">
                        </el-table-column>
                        <el-table-column prop="dictionaryName" label="字典名">
                            <template slot-scope="scope">
                                <el-button @click="handleSelect(scope.$index,scope.row)" type="text" size="small">{{scope.row.dictionaryName}}</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="dictionaryType" label="字典类型" sortable>
                        </el-table-column>
                        <el-table-column prop="dictionaryValue" label="字典值" >
                        </el-table-column>
                        <el-table-column prop="mark" label="标记" >
                        </el-table-column>
                        <el-table-column prop="updateTime" label="更新时间" sortable>
                        </el-table-column>
                        <el-table-column prop="comment" label="备注信息" >
                        </el-table-column>
                        <el-table-column prop="status" label="状态" >
                        </el-table-column>
                        <el-table-column  fixed="right" label="操作" width="180">
                            <template slot-scope="scope">
                                <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleAdd" size="mini" round></el-button>
                                <el-button type="danger" icon="el-icon-delete" @click="mutiDel" size="mini" round></el-button>
                                <el-button type="primary" icon="el-icon-edit" @click="editDictionaryById(scope.$index,scope.row)" size="mini" round></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
                <br>
                <br>
                <el-button  icon="el-icon-arrow-left" @click="prevPage"></el-button>
                <span>第{{currentPage}}页/共{{totalPage}}页</span>
                <el-button  icon="el-icon-arrow-right" @click="nextPage"></el-button>
                <!-- 分页 -->
                <!--<el-pagination @current-change="getResult"  :current-page="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="count" >
                </el-pagination>-->
            </div><!-- 页面内容区end-->
        </div><!-- 页面表格end -->
        <!--新增界面-->
        <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
            <el-form :inline="true" :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                <el-form-item label="字典名" prop="dictionary_name">
                    <el-input v-model="addForm.dictionaryName" auto-complete="off"></el-input>
                </el-form-item>
                &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
                <el-form-item label="字典类型" prop="dictionary_type">
                    <el-input v-model="addForm.dictionaryType" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="字典值" prop="dictionary_value">
                    <el-input v-model="addForm.dictionaryValue" auto-complete="off"></el-input>
                </el-form-item>
                &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
                <el-form-item label="是否启用" prop="status">
                    <el-radio v-model="addForm.status" label="1" >是</el-radio>
                    <el-radio v-model="addForm.status" label="2">否</el-radio>
                </el-form-item>
                <el-form-item label="备注信息" prop="comment">
                    <el-input v-model="addForm.comment" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click="addSubmit" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>

        <!--修改界面-->
        <el-dialog title="修改字典信息" :visible.sync="editFormVisible" :close-on-click-modal="false">
            <el-form :inline="true" :model="editForm" label-width="80px" :rules="addFormRules" ref="editForm">
                <el-form-item label="字典名" prop="dictionaryName">
                    <el-input v-model="editForm.dictionaryName" auto-complete="off"></el-input>
                </el-form-item>
                &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
                <el-form-item label="字典类型" prop="dictionaryType">
                    <el-input v-model="editForm.dictionaryType" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="字典值" prop="dictionaryValue">
                    <el-input v-model="editForm.dictionaryValue" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="是否启用" prop="status">
                    <el-radio v-model="editForm.status" label="1">是</el-radio>
                    <el-radio v-model="editForm.status" label="2">否</el-radio>
                </el-form-item>
                <el-form-item label="备注信息" prop="comment">
                    <el-input v-model="editForm.comment" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>

    </section>
</template>
<script>
    import Axios from 'axios'
    export default {
        name: 'Dictionary',
        data() {
            return {
                //搜索区域参数
                filters: {
                    dictionaryName:'',
                    dictionaryType:'',
                    mark:'',
                },
                //table返回的数据
                tableData: [],
                //列表Loading加载
                listLoading: false,
                //批量选中data
                selectList: [],

                //新增界面是否显示
                addFormVisible: false,
                //添加按钮Loading加载
                addLoading: false,

                //输入框验证
                addFormRules: {
                    dictionaryName: [{ required: true, message: "请输入字典名", trigger: "blur" }],
                    dictionaryType: [
                        { required: true, message: "请输入字典类型", trigger: "blur" }
                    ],
                    dictionaryValue: [
                        { required: true, message: "请输入字典值", trigger: "blur" }
                    ],
                    status: [{ required: true, message: "请选择是否启用", trigger: "blur" }],
                    comment: [{ required: true, message: "请输入描述信息", trigger: "blur" }]
                },
                //新增界面数据
                addForm: {
                    dictionaryName:'',
                    dictionaryType:'',
                    dictionaryValue:'',
                    status:'',
                    comment:'',
                },

                //编辑界面是否显示
                editFormVisible: false,
                //编辑按钮Loading加载
                editLoading: false,
                //编辑界面row
                editRow:"",
                //编辑界面数据
                editForm: {
                    id:'',
                    dictionaryName:'',
                    dictionaryType:'',
                    dictionaryValue:'',
                    status:'',
                    comment:'',
                },

                //分页
                totalPage: 1, // 统共页数，默认为1
                currentPage: 1, //当前页数 ，默认为1
                pageSize: 7, // 每页显示数量
                currentPageData: [] //当前页显示内容
            };
        },

        methods: {
            countPages:function(){
                // 计算一共有几页
                this.totalPage = Math.ceil(this.tableData.length / this.pageSize);
                // 计算得0时设置为1
                this.totalPage = this.totalPage == 0 ? 1 : this.totalPage;
                this.getCurrentPageData();
            },
            countSearchPages:function(data){
                this.totalPage = Math.ceil(data.length / this.pageSize);
                // 计算得0时设置为1
                this.totalPage = this.totalPage == 0 ? 1 : this.totalPage;
                this.currentPage=1;
                this.currentPageData=data;
            },
            searchDic:function(name,type,mark){
                var oldData=this.tableData;
                var newDic=[];
                for (var i=0;i<oldData.length;i++){
                    var value=oldData[i];
                    if (name==""&&type!=""&&mark!=""){
                        if (value.dictionaryType.indexOf(type)!=-1&&value.mark.indexOf(mark)!=-1) {
                            newDic.push(value)
                        }
                    }else if (name==""&&type==""&&mark!=""){
                        if (value.mark.indexOf(mark)!=-1){
                            newDic.push(value)
                        }
                    } else if (name==""&&type!=""&&mark==""){
                        if (value.dictionaryType.indexOf(type)!=-1){
                            newDic.push(value)
                        }
                    }else if (name!=""&&type==""&&mark==""){
                        if (value.dictionaryName.indexOf(name)!=-1){
                            newDic.push(value)
                        }
                    }
                    else if (name!=""&&type==""&&mark!=""){
                        if (value.dictionaryName.indexOf(name)!=-1&&value.mark.indexOf(mark)!=-1){
                            newDic.push(value)
                        }
                    } else if (name!=""&&type!=""&&mark==""){
                        if (value.dictionaryName.indexOf(name)!=-1&&value.dictionaryType.indexOf(type)!=-1){
                            newDic.push(value)
                        }
                    } else if (name==""&&type==""&&mark==""){
                        this.getResult();
                        newDic=this.tableData;
                    } else if (name!=""&&type!=""&&mark!=""){
                        if (value.dictionaryType.indexOf(type)!=-1&&value.dictionaryName.indexOf(name)!=-1&&value.mark.indexOf(mark)!=-1){
                            newDic.push(value);
                        }
                    }
                }
                this.countSearchPages(newDic);
            },
            //分页
            // 设置当前页面数据，对数组操作的截取规则为[0~9],[10~20]...,
            // 当currentPage为1时，我们显示(0*pageSize+1)-1*pageSize，当currentPage为2时，我们显示(1*pageSize+1)-2*pageSize...
            getCurrentPageData() {
                let begin = (this.currentPage - 1) * this.pageSize;
                let end = this.currentPage * this.pageSize;
                var oldTable=this.tableData;
                this.currentPageData = oldTable.slice(
                    begin,
                    end
                );
            },
            //上一页
            prevPage() {
                console.log(this.currentPage);
                if (this.currentPage == 1) {
                    return false;
                } else {
                    this.currentPage--;
                    this.getCurrentPageData();
                }
            },
            // 下一页
            nextPage() {
                if (this.currentPage == this.totalPage) {
                    return false;
                } else {
                    this.currentPage++;
                    this.getCurrentPageData();
                }
            },
            //分页结束
            editDictionaryById:function(index, row){
                this.editFormVisible=true;
                this.editForm = Object.assign({}, row);
            },
            exportDictionary:function(){

            },
            uploadDictionary:function(){

            },
            getResult: function(val) {
                this.currentPage=val;
                this.listLoading = true;
                var data={
                }
                var CommonRequest = {
                    url:"http:localhost:8090/dictionary/queryAll",
                    method:"POST",
                    data:data
                };
                Axios({
                    method:'POST',
                    baseURL:"/api/dictionary/queryAll",
                    data:CommonRequest
                }).then(CommonResponse => {
                    if (CommonResponse && CommonResponse.data.status=="success"){
                        var object=CommonResponse.data.data;
                        var length=Object.keys(object);
                        console.log(length);
                        this.tableData = object;
                        //this.count = length;
                        this.listLoading = false;
                        this.totalPage=length;
                        this.countPages();
                    }else {
                        alert(CommonResponse.data.data.errorMessage);
                    }
                })
            },


            //显示新增界面
            handleAdd: function() {
                this.addFormVisible = true;
            },
            //新增
            addSubmit: function() {
                this.$refs.addForm.validate(valid => {
                    if (valid) {
                        if (this.addForm.dictionaryName == "") {
                            this.$message({
                                message: "请填写字典名字",
                                type: "error"
                            });
                            return;
                        }
                        if (this.addForm.dictionaryType == "") {
                            this.$message({
                                message: "请填写字典类型",
                                type: "error"
                            });
                            return;
                        }
                        if (this.addForm.status == "") {
                            this.addForm.status = "1";
                        }
                        if (this.addForm.dictionaryValue==""){
                            this.$message({
                                message:"请填写字典值",
                                type:"error"
                            })
                        }
                        if (this.addForm.comment==""){
                            this.$message({
                                message:"请填写描述",
                                type:"error"
                            })
                        }
                        this.$confirm("确认提交吗？", "提示", {}).then(() => {
                            this.addLoading = true;

                            var CommonRequest = {
                                url:"http:localhost:8090/dictionary/save",
                                method:"POST",
                                data:this.addForm
                            };
                            Axios({
                                method:'POST',
                                baseURL:"/api/dictionary/save",
                                data:CommonRequest
                            }).then(CommonResponse => {
                                if (CommonResponse && CommonResponse.data.status=="success") {
                                    this.addLoading = false;
                                    this.$message({
                                        message: CommonResponse.data.data,
                                        type: "success"
                                    });
                                }
                                this.$refs["addForm"].resetFields();
                                this.addFormVisible = false;
                                this.getResult(1);
                                this.getCurrentPageData();
                            });
                        });
                    }
                });
            },
            //批量删除
            mutiDel:function(){
                this.$confirm("确认提交吗？", "提示", {}).then(() => {
                    const length = this.selectList.length;
                    for (let i = 0; i < length; i++) {
                        this.deleteDic(this.selectList[i].id);
                    }
                    this.getResult(1);
                    this.getCurrentPageData();
                })
                
            },
            //单次删除
            deleteDic:function(id){
                var CommonRequest = {
                    url:"http:localhost:8090/dictionary/edit",
                    method:"POST",
                    data:id
                };
                Axios({
                    method:'POST',
                    baseURL:"/api/dictionary/del",
                    data:CommonRequest
                }).then(CommonResponse => {
                    this.editLoading = false;
                    if (CommonResponse && CommonResponse.data.status=="success"){
                        this.$message({
                            message: CommonResponse.data.data,
                            type: "success"
                        });
                    } else {
                        this.$message({
                            message: CommonResponse.data.data.errorMessage,
                            type: "fail"
                        });
                    }
                    this.selectList = [];
                });

            },
            //显示编辑界面
            handleEdit: function(index, row) {
                this.editFormVisible = true;
                this.editForm = Object.assign({}, row);
            }, //编辑
            editSubmit: function() {
                if (this.editForm.dictionaryName == "") {
                    this.$message({
                        message: "请填写字典名字",
                        type: "error"
                    });
                    return;
                }
                if (this.editForm.dictionaryType == "") {
                    this.$message({
                        message: "请填写字典类型",
                        type: "error"
                    });
                    return;
                }
                if (this.editForm.status == "") {
                    this.addForm.status = "1";
                }
                if (this.editForm.dictionaryValue==""){
                    this.$message({
                        message:"请填写字典值",
                        type:"error"
                    })
                }
                if (this.editForm.comment==""){
                    this.$message({
                        message:"请填写描述",
                        type:"error"
                    })
                }
                this.$refs.editForm.validate(valid => {
                    if (valid) {
                        this.$confirm("确认提交吗？", "提示", {}).then(() => {
                            var newDic={
                                id:this.editForm.id,
                                dictionaryName:this.editForm.dictionaryName,
                                dictionaryType:this.editForm.dictionaryType,
                                dictionaryValue:this.editForm.dictionaryValue,
                                comment:this.editForm.comment,
                                status:this.editForm.status,
                            }
                            var CommonRequest = {
                                url:"http:localhost:8090/dictionary/edit",
                                method:"POST",
                                data:newDic
                            };
                            Axios({
                                method:'POST',
                                baseURL:"/api/dictionary/edit",
                                data:CommonRequest
                            })
                            .then(CommonResponse => {
                                this.editLoading = false;
                                if (CommonResponse && CommonResponse.data.status=="success"){
                                    this.$message({
                                        message: CommonResponse.data.data,
                                        type: "success"
                                    });
                                } else {
                                    this.$message({
                                        message: CommonResponse.data.data.errorMessage,
                                        type: "fail"
                                    });
                                }
                                this.$refs["editForm"].resetFields();
                                this.editFormVisible = false;
                                this.getResult(1);
                                this.getCurrentPageData();
                            });
                        });
                    }
                });
            },

            //批量选中
            selectChange: function(val) {
                this.selectList = val;
            },
            //table序号
            indexMethod(index) {
                return index + 1;
            },

        },
        mounted() {
            //初始加载
            this.getResult(1);
        }
    };
</script>

