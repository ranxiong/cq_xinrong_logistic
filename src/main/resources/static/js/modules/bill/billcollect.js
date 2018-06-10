$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'bill/billcollect/list',
        datatype: "json",
        colModel: [			
			{ label: 'id', name: 'id', index: 'id', width: 50, key: true },
			{ label: '序号', name: 'serialNo', index: 'serial_no', width: 80 }, 			
			{ label: '地点', name: 'address', index: 'address', width: 80 }, 			
			{ label: '运输供应商', name: 'transpotSupplier', index: 'transpot_supplier', width: 80 }, 			
			{ label: '运费类型', name: 'freightType', index: 'freight_type', width: 80 }, 			
			{ label: '运输单号', name: 'transpotNo', index: 'transpot_no', width: 80 }, 			
			{ label: '日期', name: 'date', index: 'date', width: 80 }, 			
			{ label: '起点', name: 'lineStart', index: 'line_start', width: 80 }, 			
			{ label: '线路终点', name: 'lineEnd', index: 'line_end', width: 80 }, 			
			{ label: '运输产品', name: 'transpotProduct', index: 'transpot_product', width: 80 }, 			
			{ label: '运输方式', name: 'transpotMode', index: 'transpot_mode', width: 80 }, 			
			{ label: '车型', name: 'motorcycleType', index: 'motorcycle_type', width: 80 }, 			
			{ label: '运输单价(含税保险)', name: 'transpotPrice', index: 'transpot_price', width: 80 }, 			
			{ label: '数量', name: 'quantity', index: 'quantity', width: 80 }, 			
			{ label: '总体积', name: 'voluneSum', index: 'volune_sum', width: 80 }, 			
			{ label: '总重量', name: 'weightSum', index: 'weight_sum', width: 80 }, 			
			{ label: '提送运费', name: 'deliveryFee', index: 'delivery_fee', width: 80 }, 			
			{ label: '预提运费合计（含税10%', name: 'advanceFeeIncludeTax', index: 'advance_fee_include_tax', width: 80 }, 			
			{ label: '预提运费合计（不含税）', name: 'advanceFeeNoTax', index: 'advance_fee_no_tax', width: 80 }, 			
			{ label: '', name: 'status', index: 'status', width: 80 }, 			
			{ label: '备注', name: 'comment', index: 'comment', width: 80 }, 			
			{ label: '预留字段1', name: 'reserveOne', index: 'reserve_one', width: 80 }, 			
			{ label: '预留字段2', name: 'reserveTwo', index: 'reserve_two', width: 80 }, 			
			{ label: '', name: 'createAt', index: 'create_at', width: 80 }, 			
			{ label: '', name: 'createBy', index: 'create_by', width: 80 }, 			
			{ label: '', name: 'updateAt', index: 'update_at', width: 80 }, 			
			{ label: '', name: 'updateBy', index: 'update_by', width: 80 }, 			
			{ label: '', name: 'isDelete', index: 'is_delete', width: 80 }			
        ],
		viewrecords: true,
        height: 385,
        rowNum: 10,
		rowList : [10,30,50],
        rownumbers: true, 
        rownumWidth: 25, 
        autowidth:true,
        multiselect: true,
        pager: "#jqGridPager",
        jsonReader : {
            root: "page.list",
            page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalCount"
        },
        prmNames : {
            page:"page", 
            rows:"limit", 
            order: "order"
        },
        gridComplete:function(){
        	//隐藏grid底部滚动条
        	$("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
        }
    });
});

var vm = new Vue({
	el:'#rrapp',
	data:{
		showList: true,
		title: null,
		billCollect: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.billCollect = {};
		},
		update: function (event) {
			var id = getSelectedRow();
			if(id == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(id)
		},
		saveOrUpdate: function (event) {
			var url = vm.billCollect.id == null ? "bill/billcollect/save" : "bill/billcollect/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.billCollect),
			    success: function(r){
			    	if(r.code === 0){
						alert('操作成功', function(index){
							vm.reload();
						});
					}else{
						alert(r.msg);
					}
				}
			});
		},
		del: function (event) {
			var ids = getSelectedRows();
			if(ids == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: baseURL + "bill/billcollect/delete",
                    contentType: "application/json",
				    data: JSON.stringify(ids),
				    success: function(r){
						if(r.code == 0){
							alert('操作成功', function(index){
								$("#jqGrid").trigger("reloadGrid");
							});
						}else{
							alert(r.msg);
						}
					}
				});
			});
		},
		getInfo: function(id){
			$.get(baseURL + "bill/billcollect/info/"+id, function(r){
                vm.billCollect = r.billCollect;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
                page:page
            }).trigger("reloadGrid");
		}
	}
});