package cq.anbu.modules.bill.dao;

import cq.anbu.modules.bill.entity.XinSiLuEntity;
import cq.anbu.modules.sys.dao.BaseDao;
import org.apache.ibatis.annotations.Mapper;

/**
 * 新思路账单表
 * 
 * @author tangzhonggui
 * @email java_tangzg@163.com
 * @date 2018-07-28 15:58:00
 */
@Mapper
public interface XinSiLuDao extends BaseDao<XinSiLuEntity> {
    XinSiLuEntity queryObjectByTrackingNo(String trackingNo);
}
