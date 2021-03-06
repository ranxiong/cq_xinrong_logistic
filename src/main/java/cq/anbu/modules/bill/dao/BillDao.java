package cq.anbu.modules.bill.dao;

import cq.anbu.modules.bill.entity.BillEntity;
import cq.anbu.modules.sys.dao.BaseDao;
import org.apache.ibatis.annotations.Mapper;

/**
 * 账单表
 *
 * @author tangzhonggui
 * @email java_tangzg@163.com
 * @date 2018-06-10 09:48:20
 */
@Mapper
public interface BillDao extends BaseDao<BillEntity> {
    BillEntity queryObjectByTrackingNo(String trackingNo);
}
