(function (angular) {
	'use strict';
	/*
	*主模块
	*
	*/
	var app = angular.module('myApp', []);

	//主控制器
	app.controller('myController',['$scope', '$location', function($scope, $location){
		//输入的内容
		$scope.text = '';
		//数据列表项
		$scope.todo = [
			{id:1, text:'吃饭', completed:false},
			{id:2, text:'工作', completed:false},
			{id:3, text:'睡觉', completed:true},
		]
		$scope.add = function(){
			if( $scope.text.trim() ) {
				$scope.todo.push({
					id:Math.floor(Math.random()*1000000000 ),
					text: $scope.text,
					completed: false
				});
				$scope.text = '';
			}
		}
		$scope.remove = function(num){
/*			var k = $scope.todo;
			var z = k.filter(function(item, index, array){
				return item.id != num;
			})
			$scope.todo = z;*/
			for(var i=0 ,len=$scope.todo.length; i<len; i++){
				if( $scope.todo[i].id === num ){
					$scope.todo.splice(i, 1);
					break; 
				}
			}

		}
		//清除勾选的项目
		$scope.clear = function(){
			var newArr = [];
			for(var i=0, len=$scope.todo.length; i<len; i++){
				if(!$scope.todo[i].completed){
					newArr.push($scope.todo[i]);
				}
			}
			$scope.todo = newArr;
		}
		//是否显示
		$scope.shower = function(){
			for(var i=0, len=$scope.todo.length; i<len; i++){
				if($scope.todo[i].completed){
					return true;
					break;
				}
			}
			return false;
		}
		//双击进行编辑
		$scope.currendId = -1;
		$scope.edits = function(id){
			console.log(2);
			$scope.currendId = id;
		}
		//取消编辑
		$scope.outEdit = function(){
			$scope.currendId = -1;
		}
		//全选反选
		var nows = true;
		$scope.choose = function(){
			for(var i=0, len=$scope.todo.length; i<len; i++){
				$scope.todo[i].completed = nows;
			}
			nows = !nows;
		}
		//qiehuan
		$scope.nowState = {}; 
		$scope.$location = $location;
		$scope.$watch('$location.path()', function(now, old){
			switch(now){
				case '/active':
					$scope.nowState = {completed:false};
					break;
				case '/completed':
					$scope.nowState = {completed:true};
					break;
				default:
					$scope.nowState = {};
					break;
			}
		})
	}])
	

})(angular);
