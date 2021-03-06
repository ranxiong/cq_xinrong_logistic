package cq.anbu.modules.bill.dao;

import cq.anbu.modules.bill.entity.ShangHaiMingFangEntity;
import cq.anbu.modules.sys.dao.BaseDao;
import org.apache.ibatis.annotations.Mapper;

/**
 * 上海明芳账单表
 * 
 * @author tangzhonggui
 * @email java_tangzg@163.com
 * @date 2018-07-28 15:58:00
 */
@Mapper
public interface ShangHaiMingFangDao extends BaseDao<ShangHaiMingFangEntity> {
    ShangHaiMingFangEntity queryObjectByTrackingNo(String trackingNo);
}
